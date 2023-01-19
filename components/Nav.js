import { auth } from "@/config/firebase";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "./Button";

function Nav() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const signOut = async (e) => {
    e.preventDefault();
    await auth.signOut();
    router.push("/login");
  };
  return (
    <nav className="flex justify-between items-center py-4 px-10 border-b border-solid border-fuchsia-100 ">
      <Link href="/" className="text-6xl sm:text-4xl text-fuchsia-300">
        jChat
      </Link>
      {!user ? (
        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
          <li>
            <Link className="text-fuchsia-100" href="/login">
              Logg inn
            </Link>
          </li>
          <li>
            <Button onClick={() => router.push("/sign-up")}>
              Registrer deg
            </Button>
          </li>
        </ul>
      ) : (
        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
          <li>
            <Button onClick={signOut}>Logg ut</Button>
          </li>
        </ul>
      )}
    </nav>
  );
}
export { Nav };
