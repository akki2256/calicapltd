import { ContactPageView } from "@/components/contact-page-view";
import { parseContactMode } from "@/lib/calicap-discovery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you're trying to achieve — or start the guided path if you're not sure what you need yet.",
  path: "/contact",
});

type Props = {
  searchParams?: Promise<{ mode?: string }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : {};
  const initialMode = parseContactMode(params.mode);

  return <ContactPageView initialMode={initialMode} />;
}
