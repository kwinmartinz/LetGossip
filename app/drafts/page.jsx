import { auth } from "@/auth";
import DraftsPosts from "./drafts";

export default async function Drafts() {
  const session = await auth();
  return (
    <main>
      <DraftsPosts session={session} />
    </main>
  );
}
