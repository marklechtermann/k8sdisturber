import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  PaletteMode,
} from "@mui/material";
import { Footer } from "./Footer";
import { Link } from "react-router-dom";

import KubernetesIcon from "../assets/kubernetes-icon.svg";

import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import HeartBrokenIcon from "@mui/icons-material/HeartBroken";
import MemoryIcon from "@mui/icons-material/Memory";
import DatasetIcon from "@mui/icons-material/Dataset";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useState } from "react";

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

interface Props {
  children?: JSX.Element | JSX.Element[];
}

const LayoutContainer: React.FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [themeColor, setThemeColor] = useState<PaletteMode>("light");
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const darkTheme = createTheme({
    palette: {
      mode: themeColor,
    },
  });

  const toggleThemeColor = () => {
    setThemeColor(themeColor === "light" ? "dark" : "light");
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              K8sDisturber
            </Typography>

            <IconButton color="inherit" onClick={toggleThemeColor}>
              <LightModeIcon />
            </IconButton>

            <IconButton
              color="inherit"
              href="https://github.com/marklechtermann/k8sdisturber"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <div style={{ width: "100%", marginRight: "3rem" }}>
              <img
                src={KubernetesIcon}
                style={{ marginLeft: "0.5rem", width: "2rem" }}
              />
            </div>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton component={Link} to="/home">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} to="/health">
              <ListItemIcon>
                <HeartBrokenIcon />
              </ListItemIcon>
              <ListItemText primary="Health" />
            </ListItemButton>
            <ListItemButton component={Link} to="/heavyload">
              <ListItemIcon>
                <TrafficIcon />
              </ListItemIcon>
              <ListItemText primary="HeavyLoad" />
            </ListItemButton>
            <ListItemButton component={Link} to="/memory">
              <ListItemIcon>
                <MemoryIcon />
              </ListItemIcon>
              <ListItemText primary="Memory" />
            </ListItemButton>
            <ListItemButton component={Link} to="/database">
              <ListItemIcon>
                <DatasetIcon />
              </ListItemIcon>
              <ListItemText primary="Database" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Paper sx={{ m: 5, p: 2, display: "flex", flexDirection: "column" }}>
            {children}
          </Paper>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default LayoutContainer;
