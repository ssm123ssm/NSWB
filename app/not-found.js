import Link from "next/link";
import { ArrowIcon } from "./components/Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main id="main" className="section">
      <div className="shell max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="section-title mt-3">We couldn&apos;t find that page</h1>
        <p className="lead mt-4">
          The link may be out of date. Everything we build is listed on the
          products page.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link className="btn btn-gradient" href="/">
            Back home
          </Link>
          <Link className="link-arrow" href="/products">
            View products
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}
