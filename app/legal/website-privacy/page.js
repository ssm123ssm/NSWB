import LegalDoc from "../../components/LegalDoc";
import { legalDocs } from "../../data/site";

const doc = legalDocs.find((item) => item.slug === "website-privacy");

export const metadata = {
  title: doc.title,
  description: doc.summary,
};

export default function WebsitePrivacyPage() {
  return <LegalDoc doc={doc} />;
}
