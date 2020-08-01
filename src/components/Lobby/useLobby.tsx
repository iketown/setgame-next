/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useEffect, useState, useCallback } from "react";
import { useUserCtx } from "@context/user/UserCtx";

export const useLobby = () => {
  const { db } = useFBCtx();
  const { user } = useUserCtx();

  const [publicGames, setPublicGames] = useState([]);

  useEffect(() => {
    // listen to public games
    db.ref(`publicGames`).on("value", (snap) => {
      setPublicGames(snap.val());
    });
    return () => db.ref(`publicGames`).off();
  }, [db, user]);

  return { publicGames };
};

export default useLobby;
