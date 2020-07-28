/* eslint-disable no-underscore-dangle */
import { useFBCtx } from "context/firebase/firebaseCtx";
import React, {
  useContext,
  createContext,
  useEffect,
  useState,
  useRef,
} from "react";
import useSWR, { mutate } from "swr";
import fetch from "unfetch";
import { useUserCtx } from "context/user/UserCtx";
import { useRenderCount } from "@hooks/useRenderCount";

const fetcher = (url: string) => fetch(url).then((r) => r.json());
const LobbyCtx = createContext<Partial<LobbyCtxType>>({});

export const LobbyCtxProvider: React.FC = ({ children }) => {
  useRenderCount("LobbyCtxProvider");
  const { db } = useFBCtx();
  const { userProfile } = useUserCtx();
  const { data: uniqueName, error } = useSWR("/api/uniquename", fetcher);
  const { user } = useUserCtx();
  const [publicGames, setPublicGames] = useState();
  const [myInvites, setMyInvites] = useState<string[]>([]);
  const [friendsOnline, setFriendsOnline] = useState();

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

export const useLobbyCtx = () => useContext(LobbyCtx);
