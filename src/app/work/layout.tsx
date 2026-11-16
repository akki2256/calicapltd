import type { ReactNode } from "react";
import { WorkCaseBackdrop } from "@/components/work/work-case-backdrop";

export default function WorkLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <WorkCaseBackdrop />
      {children}
    </>
  );
}
