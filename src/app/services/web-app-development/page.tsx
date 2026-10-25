import { CanvasServiceDetail } from "@/components/canvas/canvas-service-detail";
import { calicapWebAppService } from "@/lib/calicap-services";
import { getCanvasServiceDetailBySlug } from "@/lib/canvas-service-details";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: calicapWebAppService.metaTitle,
  description: calicapWebAppService.metaDescription,
  path: calicapWebAppService.path,
});

export default function WebAppDevelopmentPage() {
  const detail = getCanvasServiceDetailBySlug("web-app-development");
  if (!detail) return null;
  return <CanvasServiceDetail detail={detail} />;
}
