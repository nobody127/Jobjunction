"use client";

import { useSession } from "next-auth/react";

export default function Admin() {
  const session = useSession();
  console.log(session);
  return <div>Admin page</div>;
}
