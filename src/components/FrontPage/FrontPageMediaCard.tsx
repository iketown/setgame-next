import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Button,
  CardActions,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

interface FrontPageMediaCard {
  image: string;
  imageTitle: string;
  header: string;
  description: string;
  actions: JSX.Element;
}

const FrontPageMediaCard: React.FC<FrontPageMediaCard> = ({
  image,
  imageTitle,
  header,
  description,
  actions,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image={image}
          title={imageTitle}
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {header}
          </Typography>
          <Typography>{description}</Typography>
        </CardContent>
        <CardActions>{actions}</CardActions>
      </Card>
    </Grid>
  );
};

export default FrontPageMediaCard;
