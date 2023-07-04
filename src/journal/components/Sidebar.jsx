import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { SiderbarItem } from "./";
import { CloseOutlined } from "@mui/icons-material";

export const Sidebar = ({ drawerWidth, open, setOpen }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="persistent"
        open={matches || open}
        sx={{
          display: matches && "block",
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
          {!matches && (
            <IconButton
              onClick={() => setOpen((prevState) => !prevState)}
              color="error"
            >
              <CloseOutlined />
            </IconButton>
          )}
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SiderbarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
