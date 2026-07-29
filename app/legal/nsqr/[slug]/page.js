import { notFound } from "next/navigation";
import LegalDoc from "../../../components/LegalDoc";
import { nsqrLegalDocs } from "../../../data/site";

export function generateStaticParams() {
  return nsqrLegalDocs.map((doc) => ({ slug: doc.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const doc = nsqrLegalDocs.find((item) => item.slug === params.slug);
  if (!doc) return {};

  return { title: doc.title, description: doc.summary };
}

export default function NsqrLegalPage({ params }) {
  const doc = nsqrLegalDocs.find((item) => item.slug === params.slug);
  if (!doc) notFound();

  return <LegalDoc doc={doc} />;
}
