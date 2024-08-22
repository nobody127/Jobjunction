import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function JobLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 ">
      <Navbar />
      {children}
    </div>
  );
}
