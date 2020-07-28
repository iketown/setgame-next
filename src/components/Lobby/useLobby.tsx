/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "context/firebase/firebaseCtx";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import fetch from "unfetch";
import { useUserCtx } from "context/user/UserCtx";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useLobby = () => {
  const { db } = useFBCtx();
  const { user } = useUserCtx();
  const { data: uniqueName, error } = useSWR("/api/uniquename", fetcher);

  const [publicGames, setPublicGames] = useState([]);

  const getUniqueName = () => {
    mutate("/api/uniquename");
  };

  useEffect(() => {
    // listen to public games
    db.ref(`publicGames`).on("value", (snap) => {
      console.log("publicGames", snap.val());
      setPublicGames(snap.val());
    });
    return () => db.ref(`publicGames`).off();
  }, [db, user]);

  return { publicGames, uniqueName, getUniqueName };
};

export default useLobby;
