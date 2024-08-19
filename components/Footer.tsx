import { Instagram, Linkedin, Twitter } from "lucide-react";
import TextComponent from "./TextComp";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="mt-12 w-full flex justify-evenly flex-wrap bg-white p-4 z-50">
      <TextComponent text="© 2024 Ankit Kashyap, Building Beautiful / Useful Websites." />
      <div className="flex gap-8 mb-4">
        <Link href={"https://www.linkedin.com/in/ankit-kashyap-coder/"}>
          <Linkedin />
        </Link>

        <Link href={"https://x.com/Ankitka38153827"}>
          <Twitter />
        </Link>
      </div>
    </div>
  );
}
