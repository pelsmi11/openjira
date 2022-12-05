import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, DragEvent } from "react";
import { useUIContext } from "../../hooks";
import { Entry } from "../../interfaces";
import { dateFunctions } from "../../utils";

interface Props {
  entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endtDragging } = useUIContext();

  const rounter = useRouter();

  const onDragStart = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text", entry._id);
    startDragging();
  };
  const onDragEnd = () => {
    endtDragging();
  };

  const onClick = () => {
    rounter.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      onClick={onClick}
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
          <CardActions
            sx={{ display: "flex", justifyContent: "end", paddingRight: 2 }}
          >
            <Typography variant="body2">
              {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
            </Typography>
          </CardActions>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
