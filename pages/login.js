import { Button } from "@/components/Button";
import { auth } from "@/config/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const googleProvider = new GoogleAuthProvider();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const googleSignUp = async () => {
    try {
      setError(false);
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        router.push("/");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError("Klarte ikke å logge inn");
    }
  };

  const loginIn = useCallback(
    async (event) => {
      event.preventDefault();
      setLoading(true);

      if (!email || !password) {
        setError("Skriv inn e-post og passord");
        setLoading(false);
        return;
      }

      setError(false);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Klarte ikke å logge inn");
      }
    },
    [email, password, router]
  );

  const submitHandler = () => {
    if (!email || !password) {
      setError("Skriv inn e-post og passord");
      return;
    }
  };

  return (
    <div className="flex justify-center">
      <form
        className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={loginIn}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            E-post
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="E-post"
          />
        </div>
        <div className={`${error ? "" : "mb-6"}`}>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Passord
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        {error && <p className="text-red-700 mb-8">{error}</p>}
        <div className="flex flex-col items-center justify-between gap-4">
          <Button type="submit" onClick={submitHandler}>
            Logg inn
          </Button>
          <Button onClick={googleSignUp}>
            <FcGoogle className="text-1xl" />
            Logg inn med Google
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Login;
