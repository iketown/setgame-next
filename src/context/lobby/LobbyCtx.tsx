/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import { useRenderCount } from "@hooks/useRenderCount";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import React, { createContext, useContext, useEffect, useState } from "react";

const LobbyCtx = createContext<Partial<LobbyCtxType>>({});

export const LobbyCtxProvider: React.FC = ({ children }) => {
  useRenderCount("LobbyCtxProvider");
  const { db } = useFBCtx();
  const { userProfile, user } = useUserCtx();

  const [publicGames, setPublicGames] = useState<{
    [gameId: string]: PublicGame;
  }>();
  const [myGames, setMyGames] = useState<string[]>([]);

  useEffect(() => {
    if (!publicGames || !user?.uid) return;
    const _myGames = Object.entries(publicGames)
      .filter(([_, { players }]) => players && !!players[user.uid])
      .map(([gameId]) => gameId);
    setMyGames(_myGames);
  }, [publicGames, user?.uid]);

  useEffect(() => {
    // listen to public game listings
    db.ref(`publicGames`).on("value", (snap) => {
      setPublicGames(snap.val());
    });

    return () => db.ref(`publicGames`).off("value");
  }, [db]);

  return (
    <LobbyCtx.Provider value={{ publicGames, myGames }} {...{ children }} />
  );
};

export const useLobbyCtx = (): Partial<LobbyCtxType> => useContext(LobbyCtx);
