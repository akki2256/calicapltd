import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CanvasServiceDetail } from "@/components/canvas/canvas-service-detail";
import {
  canvasServiceDetailsForDynamicRoutes,
  getCanvasServiceDetailBySlug,
} from "@/lib/canvas-service-details";
import { pageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return canvasServiceDetailsForDynamicRoutes().map((detail) => ({
    slug: detail.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const detail = getCanvasServiceDetailBySlug(slug);
  if (!detail || detail.staticRoute) {
    return {};
  }
  return pageMetadata({
    title: detail.metaTitle,
    description: detail.metaDescription,
    path: detail.path,
  });
}

export default async function CanvasServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const detail = getCanvasServiceDetailBySlug(slug);
  if (!detail || detail.staticRoute) {
    notFound();
  }
  return <CanvasServiceDetail detail={detail} />;
}
