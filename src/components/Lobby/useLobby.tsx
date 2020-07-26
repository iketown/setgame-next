import { useFBCtx } from "context/firebase/firebaseCtx";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import fetch from "unfetch";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useLobby = () => {
  const { db } = useFBCtx();
  const { data: uniqueName, error } = useSWR("/api/uniquename", fetcher);

  const [publicGames, setPublicGames] = useState([]);

  const getUniqueName = () => {
    mutate("/api/uniquename");
  };

  useEffect(() => {
    db.ref(`publicGames`).on("value", (snap) => {
      setPublicGames(snap.val());
    });

    return () => db.ref(`publicGames`).off();
  }, []);

  return { publicGames, uniqueName, getUniqueName };
};

export default useLobby;
