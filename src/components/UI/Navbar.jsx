import * as React from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider"
import PropTypes from "prop-types";
import MediaQuery, { useMediaQuery } from "react-responsive";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Slide from "@mui/material/Slide";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircle from "@mui/icons-material/AccountCircle";
import GavelSharpIcon from "@mui/icons-material/GavelSharp";
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import EditNoteRoundedIcon from '@mui/icons-material/EditNoteRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import GradeRoundedIcon from "@mui/icons-material/GradeRounded";
import EventIcon from "@mui/icons-material/Event";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";

const navItems = ["Home", "Find Therapists", "Feed",  "Community"];

function ScrollTop(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function NavBar(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const [state, setState] = React.useState({
      right: false,
    });
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
      setState({ ...state, [anchor]: open });
    };

    const [email, setEmail] = React.useState("hatim.sawai@spit.ac.in");
    const [room, setRoom] = React.useState(1);

    const socket = useSocket();
    const navigate = useNavigate();

    const handleClick = () => {
      socket.emit("room:join", { email, room });
      setEmail("vineet.parmar@spit.ac.in");
      socket.emit("room:join", { email, room });
    };

    const handleJoinRoom = React.useCallback(
      (data) => {
        const { email, room } = data;
        navigate(`/chat`);
      },
      [navigate]
    );

    React.useEffect(() => {
      socket.on("room:join", handleJoinRoom);
      return () => {
        socket.off("room:join", handleJoinRoom);
      };
    }, [socket, handleJoinRoom]);
    
    const list = (anchor) => (
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 272 }}
        role="presentation"
      >
        <CloseIcon
          onClick={toggleDrawer(anchor, false)}
          sx={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            cursor: "pointer",
            color: "var(--secondary-color)",
            backgroundColor: "var(--bg-color)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4,
          }}
        >
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle
              sx={{
                height: 90,
                width: 90,
              }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
            }}
          >
            Hatim Sawai
          </Typography>
          <Typography
            variant="body2"
            component="div"
            sx={{
              opacity: 0.6,
              fontSize: "0.8rem",
              textAlign: "center",
              mb: 3,
            }}
          >
            <span style={{ color: "var(--primary-color)" }}>Lawyer</span>
          </Typography>
          <Box
            sx={{
              mb: 2,
              width: "87%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="body2"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <TrackChangesIcon sx={{ fontSize: "1.5rem", mr: 0.5 }} />
              94.4%
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                width: "0.125rem",
                height: "1.5rem",
                backgroundColor: "var(--text-color)",
              }}
            />
            <Typography
              variant="body2"
              component="div"
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              <GradeRoundedIcon sx={{ fontSize: "1.5rem", mr: 0.5 }} />
              8.7/10
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <List>
            <NavLink
              to="/lawyer/dashboard"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={toggleDrawer(anchor, false)}
            >
              <ListItem key="Dashboard" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <SpaceDashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/lawyer/profile/6519d5e209c887835e6ba26a"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={toggleDrawer(anchor, false)}
            >
              <ListItem key="Edit Profile" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EditNoteRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Edit Profile" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/chat"
              style={{ textDecoration: "none", color: "inherit" }}
              onClick={handleClick}
            >
              <ListItem key="Chat" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ChatRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Video Conference" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/user/myappointments"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key="My Appointments" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <EventIcon />
                  </ListItemIcon>
                  <ListItemText primary="My Appointments" />
                </ListItemButton>
              </ListItem>
            </NavLink>
            <NavLink
              to="/user/upload"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItem key="Document Translation" disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <PictureAsPdfRoundedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Document Translation" />
                </ListItemButton>
              </ListItem>
            </NavLink>
          </List>
          <List>
            <ListItem key="Logout" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Box>
    );
    return (
      <React.Fragment>
        <CssBaseline />
        <HideOnScroll {...props}>
          <AppBar
            component="nav"
            color=""
            sx={
              {
                boxShadow: "none",
                backgroundColor: "var(--bg-color)",
              }
            }
          >
            <Toolbar
              // sx={{
              //   width: "80%",
              //   margin: "0 auto",
              // }}
            >
              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {navItems.map((item) => (
                    <NavLink to={`/user/${item.toLowerCase()}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <MenuItem key={item} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{item}</Typography>
                      </MenuItem>
                    </NavLink>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                TherapEase
              </Typography>
              <GavelSharpIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                component="div"
                sx={{ 
                  flexGrow: 1,
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  display: { xs: "none", sm: "block" } 
                }}
              >
                TherapEase
              </Typography>
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                {navItems.map((item) => (
                  <NavLink
                    to={`/user/${item.toLowerCase()}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Link
                      key={item}
                      underline="none"
                      sx={{
                        color: "#000",
                        fontWeight: 700,
                        mr: 4,
                        padding: "0.3rem 0",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          borderBottom: "3px solid #000",
                        },
                      }}
                    >
                      {item}
                    </Link>
                  </NavLink>
                ))}
              </Box>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
                onClick={toggleDrawer("right", true)}
              >
                <AccountCircle
                  sx={{
                    height: 50,
                    width: 50,
                  }}
                />
              </IconButton>
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
              >
                {list("right")}
              </Drawer>
            </Toolbar>
          </AppBar>
        </HideOnScroll>
        <Toolbar id="back-to-top-anchor" />
        <Container></Container>
        <ScrollTop {...props}>
          <Fab size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    );
}