import {
  Cpu,
  FolderKanban,
  Home,
  LayoutTemplate,
  Mail,
  Monitor,
  RefreshCw,
  Smartphone,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export function serviceHrefIcon(href: string): LucideIcon {
  if (href === "/") return Home;
  if (href.includes("mobile")) return Smartphone;
  if (href.includes("transform") || href.includes("#transform")) return Workflow;
  if (href.includes("automate") || href.includes("#automate")) return Cpu;
  if (href.includes("evolve") || href.includes("#evolve")) return RefreshCw;
  if (href.includes("build") || href.includes("#build")) return LayoutTemplate;
  if (href.includes("work")) return FolderKanban;
  if (href.includes("about")) return Monitor;
  if (href.includes("contact")) return Mail;
  return Monitor;
}
