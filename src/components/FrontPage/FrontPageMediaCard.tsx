import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    width: "20rem",
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
  header: string | JSX.Element;
  description: string | JSX.Element;
  actions: JSX.Element;
  clickCardLink?: string;
}

const FrontPageMediaCard: React.FC<FrontPageMediaCard> = ({
  image,
  imageTitle,
  header,
  description,
  actions,
  clickCardLink,
}) => {
  const classes = useStyles();
  const router = useRouter();
  useEffect(() => {
    if (clickCardLink) router.prefetch(clickCardLink);
  }, []);
  return (
    <Card className={classes.card} style={{ justifyContent: "space-between" }}>
      <CardActionArea
        onClick={() => clickCardLink && router.push(clickCardLink)}
      >
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
      </CardActionArea>

      <CardActions
        style={{
          justifyContent: "space-around",
        }}
      >
        {actions}
      </CardActions>
    </Card>
  );
};

export default FrontPageMediaCard;
