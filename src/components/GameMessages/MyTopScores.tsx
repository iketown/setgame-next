import React from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  ListSubheader,
  Card,
} from "@material-ui/core";
import moment from "moment";
import { useRouter } from "next/router";

const MyTopScores: React.FC<{
  myGames: { date: string; gameId: string; points: number }[];
}> = ({ myGames }) => {
  const { query } = useRouter();
  const gameId = query.soloGameId as string;
  return (
    <Card style={{ maxHeight: "70vh", overflow: "scroll" }}>
      <List dense>
        <ListSubheader>My Top Scores</ListSubheader>
        {myGames.map((game, index) => {
          return (
            <ListItem dense key={game.gameId} selected={game.gameId === gameId}>
              <ListItemAvatar>
                <Typography variant="h5">{index + 1}</Typography>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <div>
                    <Typography component="span" variant="h5">
                      {game.points}
                    </Typography>{" "}
                    <Typography
                      component="span"
                      variant="caption"
                      color="textSecondary"
                    >
                      pts
                    </Typography>
                  </div>
                }
                secondary={moment(game.date).fromNow()}
                secondaryTypographyProps={{ variant: "caption" }}
              />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default MyTopScores;
