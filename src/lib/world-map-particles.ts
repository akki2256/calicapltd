/**
 * Sample land particles from Natural Earth land polygons (GeoJSON).
 * Geometry → lat/lon grid → point-in-polygon → unit-sphere XYZ.
 */

export type WorldMapParticleSet = {
  positions: Float32Array;
  bases: Float32Array;
  colors: Float32Array;
  phases: Float32Array;
  amps: Float32Array;
  count: number;
};

type LonLat = [number, number];
type Ring = LonLat[];
type Polygon = Ring[];

type LandPoly = {
  polygon: Polygon;
  minLon: number;
  maxLon: number;
  minLat: number;
  maxLat: number;
};

type GeoJsonGeometry =
  | { type: "Polygon"; coordinates: number[][][] }
  | { type: "MultiPolygon"; coordinates: number[][][][] };

type GeoJsonFeature = {
  type: "Feature";
  geometry: GeoJsonGeometry | null;
};

type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: GeoJsonFeature[];
};

const LAND_URL = "/geo/ne_110m_land.geojson";
const DEG = Math.PI / 180;

let landPromise: Promise<LandPoly[]> | null = null;
const sampleCache = new Map<string, Promise<WorldMapParticleSet>>();

function hash01(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function asRing(coords: number[][]): Ring {
  const ring: Ring = [];
  for (let i = 0; i < coords.length; i++) {
    const c = coords[i];
    if (!c || c.length < 2) continue;
    ring.push([c[0], c[1]]);
  }
  return ring;
}

function collectPolygons(geometry: GeoJsonGeometry): Polygon[] {
  if (geometry.type === "Polygon") {
    return [geometry.coordinates.map(asRing).filter((r) => r.length >= 3)];
  }
  const out: Polygon[] = [];
  for (const poly of geometry.coordinates) {
    const rings = poly.map(asRing).filter((r) => r.length >= 3);
    if (rings.length) out.push(rings);
  }
  return out;
}

function withBBox(polygon: Polygon): LandPoly | null {
  const outer = polygon[0];
  if (!outer?.length) return null;
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (let i = 0; i < outer.length; i++) {
    const [lon, lat] = outer[i];
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return { polygon, minLon, maxLon, minLat, maxLat };
}

function pointInRing(lon: number, lat: number, ring: Ring): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    const crosses =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi + Number.EPSILON) + xi;
    if (crosses) inside = !inside;
  }
  return inside;
}

function pointInPolygon(lon: number, lat: number, polygon: Polygon): boolean {
  if (!polygon.length || !pointInRing(lon, lat, polygon[0])) return false;
  for (let h = 1; h < polygon.length; h++) {
    if (pointInRing(lon, lat, polygon[h])) return false;
  }
  return true;
}

function isLand(lon: number, lat: number, lands: LandPoly[]): boolean {
  for (let i = 0; i < lands.length; i++) {
    const L = lands[i];
    if (lon < L.minLon || lon > L.maxLon || lat < L.minLat || lat > L.maxLat) {
      continue;
    }
    if (pointInPolygon(lon, lat, L.polygon)) return true;
  }
  return false;
}

function lonLatToSphere(lon: number, lat: number, radius: number, out: number[], o: number) {
  const φ = lat * DEG;
  const λ = lon * DEG;
  const cosφ = Math.cos(φ);
  out[o] = radius * cosφ * Math.cos(λ);
  out[o + 1] = radius * Math.sin(φ);
  out[o + 2] = -radius * cosφ * Math.sin(λ);
}

async function loadLandPolygons(): Promise<LandPoly[]> {
  if (!landPromise) {
    landPromise = fetch(LAND_URL)
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load land GeoJSON (${r.status})`);
        return r.json() as Promise<GeoJsonFeatureCollection>;
      })
      .then((fc) => {
        const lands: LandPoly[] = [];
        for (const f of fc.features) {
          if (!f.geometry) continue;
          for (const poly of collectPolygons(f.geometry)) {
            const boxed = withBBox(poly);
            if (boxed) lands.push(boxed);
          }
        }
        return lands;
      })
      .catch((err) => {
        landPromise = null;
        throw err;
      });
  }
  return landPromise;
}

export type SampleOptions = {
  /** Approximate target particle count (land-only). */
  targetCount?: number;
  /** Sphere radius in scene units. */
  radius?: number;
  /**
   * Thin Antarctica so the southern mass doesn't dominate the silhouette.
   * 1 = full density, 0.35 = sparse ice shelf cue.
   */
  antarcticaDensity?: number;
};

function pushParticle(
  lon: number,
  lat: number,
  radius: number,
  id: number,
  brightnessBase: number,
  positions: number[],
  colors: number[],
  phases: number[],
  amps: number[],
) {
  if (lat < -85 || lat > 85) return;
  const o = positions.length;
  lonLatToSphere(lon, lat, radius, positions, o);
  const radial = 1 + (hash01(id * 5.3) - 0.5) * 0.01;
  positions[o] *= radial;
  positions[o + 1] *= radial;
  positions[o + 2] *= radial;
  const brightness = brightnessBase + hash01(id * 9.1) * 0.28;
  colors.push(brightness, brightness, brightness);
  phases.push(hash01(id * 1.13));
  amps.push(0.0015 + hash01(id * 4.4) * 0.0035);
}

/** Dense coastline samples — the silhouette that makes continents readable. */
function sampleCoastlines(
  lands: LandPoly[],
  radius: number,
  stepDeg: number,
  antarcticaDensity: number,
  positions: number[],
  colors: number[],
  phases: number[],
  amps: number[],
  idRef: { n: number },
) {
  for (let li = 0; li < lands.length; li++) {
    const outer = lands[li].polygon[0];
    if (!outer || outer.length < 3) continue;
    for (let i = 0; i < outer.length - 1; i++) {
      const [lon0, lat0] = outer[i];
      const [lon1, lat1] = outer[i + 1];
      if (lat0 < -60 && lat1 < -60 && hash01(li * 17 + i) > antarcticaDensity + 0.15) {
        continue;
      }
      const dLon = lon1 - lon0;
      const dLat = lat1 - lat0;
      const dist = Math.hypot(dLon, dLat);
      const segs = Math.max(1, Math.ceil(dist / stepDeg));
      for (let s = 0; s < segs; s++) {
        const t = s / segs;
        const lon = lon0 + dLon * t;
        const lat = lat0 + dLat * t;
        pushParticle(
          lon,
          lat,
          radius,
          idRef.n++,
          0.88,
          positions,
          colors,
          phases,
          amps,
        );
      }
    }
  }
}

/**
 * Build a sparse, elegant particle set from real landmass geometry.
 * Coastline samples + equal-area fill grid against Natural Earth land.
 */
export async function sampleWorldMapParticles(
  options: SampleOptions = {},
): Promise<WorldMapParticleSet> {
  const targetCount = options.targetCount ?? 6200;
  const radius = options.radius ?? 1;
  const antarcticaDensity = options.antarcticaDensity ?? 0.32;
  const cacheKey = `v5|${targetCount}|${radius}|${antarcticaDensity}`;

  const cached = sampleCache.get(cacheKey);
  if (cached) return cached;

  const promise = (async (): Promise<WorldMapParticleSet> => {
    const lands = await loadLandPolygons();

    const positions: number[] = [];
    const colors: number[] = [];
    const phases: number[] = [];
    const amps: number[] = [];
    const idRef = { n: 0 };

    /* Coastlines first — dense rings = sharp continent edges */
    const coastStep = targetCount < 3500 ? 0.7 : 0.42;
    sampleCoastlines(
      lands,
      radius,
      coastStep,
      antarcticaDensity,
      positions,
      colors,
      phases,
      amps,
      idRef,
    );

    const coastCount = positions.length / 3;
    const fillBudget = Math.max(800, targetCount - coastCount);

    /* Interior fill — lighter, sparser than coasts */
    const landFraction = 0.22;
    const roughCells = fillBudget / landFraction;
    const latSteps = Math.max(48, Math.round(Math.sqrt(roughCells * 0.7)));
    const lonSteps = Math.max(96, Math.round(latSteps * 2));

    for (let iy = 0; iy <= latSteps; iy++) {
      const lat = -90 + (180 * iy) / latSteps;
      if (lat < -84 || lat > 84) continue;
      const cosLat = Math.max(0.12, Math.cos(lat * DEG));
      const rowLonSteps = Math.max(8, Math.round(lonSteps * cosLat));

      for (let ix = 0; ix < rowLonSteps; ix++) {
        const lon = -180 + (360 * (ix + 0.5)) / rowLonSteps;
        if (!isLand(lon, lat, lands)) continue;

        if (lat < -60) {
          const t = (-60 - lat) / 24;
          const keep = antarcticaDensity + (1 - antarcticaDensity) * (1 - t);
          if (hash01(idRef.n * 1.7 + iy * 3.1) > keep) {
            idRef.n++;
            continue;
          }
        }

        const jitterLon = (hash01(idRef.n * 2.1) - 0.5) * (360 / rowLonSteps) * 0.18;
        const jitterLat = (hash01(idRef.n * 3.7) - 0.5) * (180 / latSteps) * 0.18;
        pushParticle(
          lon + jitterLon,
          Math.max(-85, Math.min(85, lat + jitterLat)),
          radius,
          idRef.n++,
          0.52,
          positions,
          colors,
          phases,
          amps,
        );
      }
    }

    let count = positions.length / 3;
    if (count > targetCount * 1.15) {
      /* Prefer keeping brighter (coast) points when thinning */
      const keepEvery = count / targetCount;
      const np: number[] = [];
      const nc: number[] = [];
      const nph: number[] = [];
      const na: number[] = [];
      let acc = 0;
      for (let i = 0; i < count; i++) {
        const brightness = colors[i * 3];
        const weight = brightness > 0.7 ? keepEvery * 0.55 : keepEvery;
        acc += 1;
        if (acc < weight) continue;
        acc -= weight;
        const s = i * 3;
        np.push(positions[s], positions[s + 1], positions[s + 2]);
        nc.push(colors[s], colors[s + 1], colors[s + 2]);
        nph.push(phases[i]);
        na.push(amps[i]);
      }
      positions.length = 0;
      colors.length = 0;
      phases.length = 0;
      amps.length = 0;
      positions.push(...np);
      colors.push(...nc);
      phases.push(...nph);
      amps.push(...na);
      count = positions.length / 3;
    }

    const pos = new Float32Array(positions);
    return {
      positions: pos,
      bases: new Float32Array(pos),
      colors: new Float32Array(colors),
      phases: new Float32Array(phases),
      amps: new Float32Array(amps),
      count,
    };
  })();

  sampleCache.set(cacheKey, promise);
  try {
    return await promise;
  } catch (err) {
    sampleCache.delete(cacheKey);
    throw err;
  }
}
