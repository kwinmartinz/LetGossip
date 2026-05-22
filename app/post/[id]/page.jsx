import { auth } from "@/auth";
import SinglePostClient from "./post";

export default async function SinglePost({ params }) {
  const { id } = await params;
  const session = await auth();
  return (
    <main>
      <SinglePostClient id={id} session={session} />
    </main>
  );
}
