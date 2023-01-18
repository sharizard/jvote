import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/config/firebase";
import { Button } from "@/components/Button";

function SignUp() {
  const [userCreated, setUserCreated] = useState(false)
  const [error, setError] = useState(false)
  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.currentTarget.elements;
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        if (user) {
          setUserCreated(true)
          setError(false)
        }
      } catch (err) {
        console.error(err);
        setUserCreated(false)
        setError(true)
      }
    },
    []
  );

  return (
    <div className="flex justify-center">
      <form
        className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSignUp}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            E-post
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="E-post"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        {userCreated && <p className="mb-8 text-green-700">Bruker opprettet!</p>}
        {error && <p className="mb-8 text-red-700">En feil oppstod!</p>}

        <div className="flex items-center justify-between">
          <Button type="submit">Registrer deg</Button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
