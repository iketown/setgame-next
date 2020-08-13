/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable spaced-comment */
/* eslint-disable no-underscore-dangle */
import { useGameCtx } from "@context/game/GameCtx";
import { Typography, Button, Box, Grid } from "@material-ui/core";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useSoloGameCtx } from "@context/game/SoloGameCtx";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import { useUserCtx } from "@context/user/UserCtx";
import { useRouter } from "next/router";
import Link from "next/link";
import GameMessageOverlay from "./GameMessageOverlay";
import MyTopScores from "./MyTopScores";

const SoloGameOver: React.FC = () => {
  const { gameOver, setGameOver } = useGameCtx();
  const { query } = useRouter();
  const { firestore } = useFBCtx();
  const { user } = useUserCtx();
  const { soloState } = useSoloGameCtx();
  const [showGameOver, setShowGameOver] = useState(false); // allows for a couple seconds before showing game over screen
  const [myGames, setMyGames] = useState<
    { date: string; points: number; gameId: string }[]
  >([]);

  useEffect(() => {
    const soloGameId = query.soloGameId as string;
    const mySoloGames = firestore.collection(`users/${user.uid}/soloGames`);

    if (!gameOver) return;
    const mySoloGame = mySoloGames.doc(soloGameId);

    async function saveSoloGame() {
      const exists = await mySoloGame.get().then((doc) => doc.exists);
      if (!exists) {
        await mySoloGame.set({
          gameId: soloGameId,
          date: gameOver,
          points: soloState.points,
        });
      }
      mySoloGames
        .orderBy("points", "desc")
        .limit(20)
        .get()
        .then((snap) => {
          const _myGames = [];
          snap.forEach((doc) => {
            _myGames.push(doc.data());
          });
          //@ts-ignore
          // _myGames.sort((a, b) => b.points - a.points);
          setMyGames(_myGames);
        });
    }
    saveSoloGame();
  }, [user, soloState, gameOver, firestore, query.soloGameId]);

  const delayShowGameOver = () => {
    setTimeout(() => {
      setShowGameOver(true);
    }, 1000);
  };

  if (!gameOver) return null;
  if (gameOver && !showGameOver) {
    delayShowGameOver();
    return null;
  }

  return (
    <GameMessageOverlay>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1, transition: { duration: 0.5 } }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3" gutterBottom>
              GAME OVER
            </Typography>
            <Box
              border="2px solid grey"
              borderRadius="50%"
              padding="1rem"
              width="6rem"
              height="6rem"
              marginBottom="2rem"
            >
              <Typography variant="h4">{soloState.points}</Typography>
              <Typography variant="caption">points</Typography>
            </Box>
            <Link href="/solo" as="/solo">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  setGameOver(false);
                }}
              >
                Play Again
              </Button>
            </Link>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <MyTopScores myGames={myGames} />
          </Grid>
        </Grid>

        {/* <pre>{JSON.stringify(myGames, null, 2)}</pre> */}
      </motion.div>
    </GameMessageOverlay>
  );
};

export default SoloGameOver;
