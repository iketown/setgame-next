import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useGameCtx } from "@context/game/GameCtx";

export const useGameOptions = () => {
  const { db } = useFBCtx();
  const { gameId } = useGameCtx();

  const setOptionValue = (key: string, value: any) => {
    const optionRef = db.ref(`games/${gameId}/options/${key}`);
    optionRef.set(value);
  };
  return { setOptionValue };
};

export default useGameOptions;
