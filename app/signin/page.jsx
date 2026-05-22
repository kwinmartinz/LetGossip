import { auth as getSession } from "@/auth";
import { redirect } from "next/navigation";
import SignInClient from "./SignInClient";

export default async function SignIn() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return <SignInClient />;
}
