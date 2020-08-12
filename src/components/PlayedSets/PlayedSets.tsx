/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { List, Typography } from "@material-ui/core";
import moment from "moment";
import React, { useMemo, useRef, useEffect } from "react";

import { useGameCtx } from "@context/game/GameCtx";
import PlayedSetListItem from "./PlayedSetListItem";

//
//

const PlayedSets: React.FC = () => {
  const { state } = useGameCtx();
  const { playedSets } = state;
  const listRef = useRef(null);

  // automatically scroll to top when set is added
  useEffect(() => {
    listRef.current?.scrollTo({ top: 0, left: 0 });
  }, [listRef.current, playedSets]);

  const setsInOrder = useMemo(() => {
    if (!playedSets) return null;
    const setsByTime = Object.entries(playedSets).reduce(
      (
        obj: { [time: string]: { uid: string; set: string[] } },
        [uid, userSets]
      ) => {
        userSets.forEach((set) => {
          obj[set.playedAt] = { uid, set: set.set };
        });
        return obj;
      },
      {}
    );
    const _setsInOrder = Object.entries(setsByTime)
      .sort(([timeA], [timeB]) => (moment(timeA).isBefore(timeB) ? 1 : -1))
      .map(([time, info]) => ({ time, ...info }));

    return _setsInOrder;
  }, [playedSets]);

  if (!setsInOrder) return null;

  return (
    <div>
      <List
        innerRef={listRef}
        style={{
          maxHeight: "20rem",
          overflowY: "scroll",
          width: "16rem",
        }}
      >
        <Typography
          style={{ margin: "1rem 0 2rem" }}
          variant="subtitle2"
          color="textSecondary"
        >
          PLAYED SETS
        </Typography>
        {setsInOrder?.map(({ time, uid, set }, index) => {
          return (
            <PlayedSetListItem
              key={`${time}${uid}`}
              {...{ time, uid, set, index }}
            />
          );
        })}
      </List>
    </div>
  );
};

export default PlayedSets;
