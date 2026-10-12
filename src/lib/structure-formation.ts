/**
 * Digital Structure Formation — modular translucent cube cluster + stream
 * paths for the Canvas Services Three.js scene.
 */

export type StructureCube = {
  cx: number;
  cy: number;
  cz: number;
  half: number;
  glass: number;
  edge: number;
  core?: boolean;
  /** Optional face icon: "user" | "play" | "card" */
  icon?: "user" | "play" | "card";
};

export type StructureStream = {
  /** Cubic bezier control points in local space */
  points: [number, number, number][];
  debris: number;
};

export type StructureFormationSet = {
  cubes: StructureCube[];
  streams: StructureStream[];
};

export type StructureFormationOptions = {
  mobile?: boolean;
};

function hash01(n: number): number {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export function assembleEase(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

export function sampleStream(
  stream: StructureStream,
  t: number,
): [number, number, number] {
  const pts = stream.points;
  const u = Math.min(1, Math.max(0, t));
  const uu = 1 - u;
  const uu2 = uu * uu;
  const u2 = u * u;
  const [p0, p1, p2, p3] = pts;
  return [
    uu2 * uu * p0[0] + 3 * uu2 * u * p1[0] + 3 * uu * u2 * p2[0] + u2 * u * p3[0],
    uu2 * uu * p0[1] + 3 * uu2 * u * p1[1] + 3 * uu * u2 * p2[1] + u2 * u * p3[1],
    uu2 * uu * p0[2] + 3 * uu2 * u * p1[2] + 3 * uu * u2 * p2[2] + u2 * u * p3[2],
  ];
}

/** Incomplete modular crystal — denser on desktop */
function buildCubes(mobile: boolean): StructureCube[] {
  const cell = mobile ? 0.48 : 0.58;
  const list: StructureCube[] = [];

  /* Occupied voxel cells — incomplete 3³ for silhouette interest */
  const cells: [number, number, number, number, number][] = [
    /* gx, gy, gz, scaleMul, glass */
    [0, 0, 0, 0.52, 0.55],
    [-1, 0, 0, 1, 0.12],
    [1, 0, 0, 1, 0.12],
    [0, 1, 0, 1, 0.11],
    [0, -1, 0, 0.95, 0.1],
    [0, 0, 1, 1, 0.12],
    [0, 0, -1, 0.95, 0.1],
    [-1, 1, 0, 0.88, 0.09],
    [1, 1, 0, 0.88, 0.09],
    [-1, 0, 1, 0.9, 0.09],
    [1, 0, -1, 0.9, 0.09],
    [-1, -1, 0, 0.8, 0.08],
    [1, -1, 1, 0.78, 0.08],
    [0, 1, 1, 0.82, 0.09],
    [0, -1, -1, 0.8, 0.08],
  ];

  if (!mobile) {
    cells.push(
      [-1, 1, 1, 0.72, 0.07],
      [1, 1, -1, 0.72, 0.07],
      [1, 0, 1, 0.85, 0.085],
      [-1, 0, -1, 0.85, 0.085],
      [1, -1, 0, 0.78, 0.08],
    );
  }

  for (let i = 0; i < cells.length; i++) {
    const [gx, gy, gz, sm, glass] = cells[i];
    const isCore = gx === 0 && gy === 0 && gz === 0;
    const half = cell * sm * (isCore ? 0.7 : 0.48);
    const jitter = isCore ? 0 : 0.014;
    list.push({
      cx: gx * cell + (hash01(i * 3.1) - 0.5) * jitter,
      cy: gy * cell + (hash01(i * 5.7) - 0.5) * jitter,
      cz: gz * cell + (hash01(i * 7.9) - 0.5) * jitter,
      half,
      glass: isCore ? 0.72 : glass,
      edge: isCore ? 1 : 0.7 + hash01(i) * 0.22,
      core: isCore,
    });
  }

  /* Outer translucent envelope */
  list.push({
    cx: 0.015,
    cy: 0.03,
    cz: -0.02,
    half: cell * 1.58,
    glass: 0.03,
    edge: 0.42,
  });

  /* Icon-bearing modules (match reference glyphs) */
  if (!mobile) {
    list[2]!.icon = "user"; /* +X */
    list[12]!.icon = "play"; /* lower-rightish */
    list[1]!.icon = "card"; /* -X */
  }

  return list;
}

function buildStreams(mobile: boolean): StructureStream[] {
  const streams: StructureStream[] = [];
  const arms = mobile ? 6 : 11;

  for (let i = 0; i < arms; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const y0 = (hash01(i * 2.3) - 0.5) * 0.28;
    const z0 = (hash01(i * 4.1) - 0.5) * 0.22;
    const spread = 1.85 + hash01(i * 6.7) * 1.5;
    const lift = (hash01(i * 8.9) - 0.35) * 0.55;
    const bend = 0.4 + hash01(i * 11.1) * 0.5;

    streams.push({
      points: [
        /* Start outside the core so outflow never piles up at the center */
        [side * 0.42, y0 * 0.4, z0],
        [
          side * (0.75 + bend * 0.25),
          y0 + lift * 0.35,
          z0 + (hash01(i) - 0.5) * 0.2,
        ],
        [
          side * (1.2 + bend * 0.45),
          y0 + lift * 0.7 + (hash01(i * 13) - 0.5) * 0.22,
          z0 + (hash01(i * 17) - 0.5) * 0.32,
        ],
        [
          side * spread,
          y0 + lift + (hash01(i * 19) - 0.5) * 0.35,
          z0 + (hash01(i * 23) - 0.5) * 0.45,
        ],
      ],
      debris: mobile ? 3 : 5,
    });
  }

  return streams;
}

export function buildStructureFormation(
  options: StructureFormationOptions = {},
): StructureFormationSet {
  const mobile = options.mobile ?? false;
  return {
    cubes: buildCubes(mobile),
    streams: buildStreams(mobile),
  };
}
