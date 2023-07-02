import { TurnedInNot } from "@mui/icons-material";
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store/journal/journalSlice";

export const SiderbarItem = ({ title, body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const newtitle = useMemo(() => {
        return title.length > 15
               ? title.substring(0, 15) + '...'
               : title 
    }, [title]);

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => dispatch(setActiveNote({title, body, id, date, imageUrls}))}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newtitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
