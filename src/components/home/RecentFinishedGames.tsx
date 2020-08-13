/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, Fragment } from "react";
import {
  Card,
  List,
  ListSubheader,
  ListItem,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useFBCtx } from "@context/firebase/firebaseCtx";
import moment from "moment";
import RecentGameListItem from "./RecentGameListItem";
//
//
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(0.5, 4),
  },
  list: {
    maxHeight: theme.spacing(70),
    overflow: "scroll",
  },
}));

const RecentFinishedGames: React.FC = () => {
  const { db } = useFBCtx();
  const [recentGames, setRecentGames] = useState<[string, RecentGame][]>([]);
  useEffect(() => {
    const recentGamesRef = db.ref(`/recentGames`);
    recentGamesRef.on("value", (snap) => {
      if (!snap.exists()) return;
      const games: {
        [gameId: string]: RecentGame;
      } = snap.val();
      if (games) {
        const recentFirst: [string, RecentGame][] = Object.entries(games).sort(
          ([_, objA], [__, objB]) => {
            return objB.endedAt - objA.endedAt;
          }
        );
        setRecentGames(recentFirst);
      }
    });
    return () => recentGamesRef.off();
  }, [db]);
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <List className={classes.list}>
          <ListSubheader>RECENTLY FINISHED</ListSubheader>
          {recentGames.map(([gameId, recentGame]) => {
            return (
              <Fragment key={gameId}>
                <div style={{ textAlign: "right", paddingRight: "2rem" }}>
                  <Typography variant="caption" color="textSecondary">
                    {moment(recentGame.endedAt).fromNow()}
                  </Typography>
                </div>
                <RecentGameListItem {...{ recentGame }} />
                <Divider className={classes.divider} />
              </Fragment>
            );
          })}
        </List>
      </Card>
      {/* <pre>{JSON.stringify(recentGames, null, 2)}</pre> */}
    </>
  );
};

export default RecentFinishedGames;
