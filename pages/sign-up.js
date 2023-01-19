import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "@/config/firebase";
import { Button } from "@/components/Button";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const router = useRouter();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      if (!email || !password || !name) {
        setError("Fyll ut alle felter");
        return;
      }
      try {
        setLoading(true);
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          await setDoc(doc(db, "users", user.user.uid), {
            name,
          });

          router.push("/");
        }
      } catch (err) {
        setUserCreated(false);
        setError(err.code);
        setLoading(false);
      }
    },
    [email, name, password, router]
  );

  if (loading) {
    return "Loading...";
  }

  return (
    <div className="flex justify-center">
      <form
        className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSignUp}
      >
        <div className="mb-4">
          <label
            className="block text-fuchsia-100 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Navn
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Navn"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-fuchsia-100 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-post
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-fuchsia-100 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </div>
        {userCreated && (
          <p className="mb-8 text-green-500">Bruker opprettet!</p>
        )}
        {error && <p className="mb-8 text-red-500">{error}</p>}

        <div className="flex items-center justify-between">
          <Button disabled={loading} type="submit">
            Registrer deg
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
