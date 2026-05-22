"use server";
import { auth } from "@/auth";
import ExplorePosts from "./explore";

export default async function Explore() {
  const session = await auth();
  return (
    <main>
      <ExplorePosts session={session} />
    </main>
  );
}
