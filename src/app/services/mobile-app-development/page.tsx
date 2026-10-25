import { CanvasServiceDetail } from "@/components/canvas/canvas-service-detail";
import { calicapMobileAppService } from "@/lib/calicap-services";
import { getCanvasServiceDetailBySlug } from "@/lib/canvas-service-details";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: calicapMobileAppService.metaTitle,
  description: calicapMobileAppService.metaDescription,
  path: calicapMobileAppService.path,
});

export default function MobileAppDevelopmentPage() {
  const detail = getCanvasServiceDetailBySlug("mobile-app-development");
  if (!detail) return null;
  return <CanvasServiceDetail detail={detail} />;
}
