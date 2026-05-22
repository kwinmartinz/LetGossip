"use server";
import { redirect } from "next/navigation";
import WritePage from "./write";
import { auth } from "@/auth";

export default async function Write() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }
  return (
    <main>
      <WritePage session={session} />
    </main>
  );
}
