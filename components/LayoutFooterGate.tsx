"use client";

import { usePathname } from "next/navigation";

export default function LayoutFooterGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Hide on /contact and any nested routes like /contact/thanks
  const hide = pathname?.startsWith("/contact");
  if (hide) return null;
  return <>{children}</>;
}
