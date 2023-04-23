// @ts-nocheck
"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Image
      src="/logo.png"
      alt="Picture of the author"
      width={48}
      height={48}
      className="pointer"
      onClick={() => router.push("/")}
    />
  );
}
