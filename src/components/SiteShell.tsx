"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import SocialStrip from "./SocialStrip";
import ScrollProgress from "./ScrollProgress";

export default function SiteShell() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  if (isAdmin) return null;
  return (
    <>
      <ScrollProgress />
      <Header />
      <SocialStrip />
    </>
  );
}
