import { auth } from "@/auth";
import ProfilePage from "./profilepage";

export default async function Profile() {
  const session = await auth();
  return (
    <main>
      <ProfilePage session={session} />
    </main>
  );
}
