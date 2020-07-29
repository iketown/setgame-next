/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useRenderCount } from "@hooks/useRenderCount";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import React, { createContext, useContext, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import fetch from "unfetch";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const LobbyCtx = createContext<Partial<LobbyCtxType>>({});

export const LobbyCtxProvider: React.FC = ({ children }) => {
  useRenderCount("LobbyCtxProvider");
  const { db } = useFBCtx();
  const { userProfile } = useUserCtx();
  const { data: uniqueName } = useSWR("/api/uniquename", fetcher);
  const [publicGames, setPublicGames] = useState();

  const getUniqueName = () => {
    mutate("/api/uniquename");
  };

  useEffect(() => {
    // listen to which of my friends are online
    if (!userProfile) return;
    const friendIds =
      (userProfile.friends && Object.keys(userProfile.friends)) || [];
    console.log({ friendIds });
  }, [userProfile]);

  useEffect(() => {
    // listen to public game listings
    db.ref(`publicGames`).on("value", (snap) => {
      setPublicGames(snap.val());
    });

    return () => db.ref(`publicGames`).off();
  }, []);

  return (
    <LobbyCtx.Provider
      value={{ getUniqueName, uniqueName, publicGames }}
      {...{ children }}
    />
  );
};

export const useLobbyCtx = (): Partial<LobbyCtxType> => useContext(LobbyCtx);
