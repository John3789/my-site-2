"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AutoRedirectIfNoMember() {
  const router = useRouter();

  useEffect(() => {
    const ms = window.$memberstack || window.memberstack || window.Memberstack;
    if (!ms?.getCurrentMember) return;

    ms.getCurrentMember().then((res) => {
      const member = res?.data?.member || res?.member || null;
      if (!member) router.replace("/membership");
    });
  }, [router]);

  return null;
}
