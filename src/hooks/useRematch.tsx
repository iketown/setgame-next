import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useEffect, useState, useMemo } from "react";
import { useGameCtx } from "@context/game/GameCtx";

//
//
export const useRematch = () => {
  const { db } = useFBCtx();
  const { gameId } = useGameCtx();
  const [rematch, setRematch] = useState<RematchType>();
  const rematchRef = useMemo(() => db.ref(`/games/${gameId}/rematch`), [
    db,
    gameId,
  ]);
  useEffect(() => {
    rematchRef.on("value", (snap) => {
      setRematch(snap.val());
    });
    return () => rematchRef.off();
  }, [rematchRef]);
  return { rematch };
};

export default useRematch;
