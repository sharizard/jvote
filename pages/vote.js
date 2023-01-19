import { auth, db } from "@/config/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

function Vote() {
  const [user] = useAuthState(auth);
  const [votes, loading, error] = useCollection(collection(db, "votes"), {});

  const addVote = async (value) => {
    await setDoc(doc(db, "votes", user.uid), {
      vote: value,
    });
  };

  const yesVotes = votes?.docs?.filter(
    (doc) => doc.data().vote === true
  )?.length;
  const noVotes = votes?.docs?.filter(
    (doc) => doc.data().vote === false
  )?.length;

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl">En feil oppstod</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-10">
      <h1 className="text-8xl pb-10">Skal du på middagen idag?</h1>
      <div className="flex flex-row space-x-2">
        <button
          className="text-4xl border-black border-2 p-4"
          onClick={(e) => addVote(true)}
        >
          JA! 😍
        </button>
        <h2 className="text-4xl text-center items-center flex">{`Antall stemmer: ${yesVotes}`}</h2>
      </div>
      <div className="flex flex-row space-x-2">
        <button
          className="text-4xl border-black border-2 p-4"
          onClick={(e) => addVote(false)}
        >
          Nei! 😭
        </button>
        <h2 className="text-4xl text-center items-center flex">{`Antall stemmer: ${noVotes}`}</h2>
      </div>
    </div>
  );
}

export default Vote;
