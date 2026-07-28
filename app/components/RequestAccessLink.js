"use client";

import { ArrowIcon } from "./Icons";
import { useContact } from "./SiteChrome";

/**
 * Small client island so otherwise-static pages can open the contact dialog
 * without becoming client components themselves.
 */
export default function RequestAccessLink({
  product,
  label = "Request access",
  className = "link-arrow",
  withArrow = true,
}) {
  const { open } = useContact();

  return (
    <button className={className} type="button" onClick={() => open(product)}>
      {label}
      {withArrow && <ArrowIcon />}
    </button>
  );
}
