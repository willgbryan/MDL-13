import { Login } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MDL-13 Login",
  description:
    "MDL-13 is the premier invite only data analytics platform for sports betting.",
};

export default function LoginPage() {
  return (
    <main className="">
      <Login />
    </main>
  );
}
