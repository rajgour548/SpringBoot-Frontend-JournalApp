
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
  Container,
} from "@mui/material";

import MenuRounded from "@mui/icons-material/MenuRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import HomeRounded from "@mui/icons-material/HomeRounded";
import AutoStoriesRounded from "@mui/icons-material/AutoStoriesRounded";
import InfoRounded from "@mui/icons-material/InfoRounded";

import UserInfo from "./UserInfo";

interface HeaderProps {
  actualName: string;
  email: string;
}

function Header({ actualName, email }: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const navItems = [
    {
      label: "Home",
      to: "/home",
      icon: <HomeRounded sx={{ fontSize: 19 }} />,
    },
    {
      label: "My Journals",
      to: "/home/journal",
      icon: <AutoStoriesRounded sx={{ fontSize: 19 }} />,
    },
    {
      label: "About",
      to: "/home/about",
      icon: <InfoRounded sx={{ fontSize: 19 }} />,
    },
  ];

  const isActive = (path: string) => {
    if (path === "/home") {
      return location.pathname === "/home";
    }

    return location.pathname === path ||
      location.pathname.startsWith(`${path}/`);
  };

  const navButtonSx = (path: string) => ({
    mx: 0.4,
    px: 1.8,
    py: 1,
    minHeight: 40,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    gap: 0.8,
    color: (theme: any) =>
      theme.palette.mode === "light" ? "#62547F" : "#D5C9EA",
    bgcolor: isActive(path) ? "rgba(141, 122, 184, 0.13)" : "transparent",
    fontWeight: isActive(path) ? 750 : 600,
    fontSize: "0.9rem",
    textTransform: "none" as const,
    transition: "background-color 180ms ease, color 180ms ease",
    "&:hover": {
      bgcolor: "rgba(141, 122, 184, 0.14)",
    },
  });

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: (theme: any) =>
          theme.palette.mode === "light"
            ? "rgba(255, 255, 255, 0.82)"
            : "rgba(22, 20, 30, 0.82)",
        color: "text.primary",
        backdropFilter: "blur(18px)",
        borderBottom: "1px solid",
        borderColor: (theme: any) =>
          theme.palette.mode === "light"
            ? "rgba(0, 0, 0, 0.05)"
            : "rgba(255, 255, 255, 0.08)",
        zIndex: (theme) => theme.zIndex.appBar,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 64, md: 72 },
            gap: { xs: 1, sm: 1.5 },
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/home"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              mr: { xs: 0.5, md: 3 },
              flexShrink: 0,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 3,
                color: "#FFFFFF",
                background:
                  "linear-gradient(135deg, #A995D0 0%, #8D7AB8 100%)",
                boxShadow: "0 5px 14px rgba(141, 122, 184, 0.22)",
              }}
            >
              <MenuBookRounded sx={{ fontSize: 23 }} />
            </Box>

            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: 850,
                letterSpacing: "-0.04em",
                fontSize: { xs: "1.05rem", sm: "1.2rem" },
                background:
                  "linear-gradient(100deg, #8D7AB8 0%, #A77DAD 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              JournalApp
            </Typography>
          </Box>

          {/* Desktop navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.to}
                component={Link}
                to={item.to}
                aria-current={isActive(item.to) ? "page" : undefined}
                sx={navButtonSx(item.to)}
                startIcon={item.icon}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile navigation */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <IconButton
              size="large"
              aria-label="Open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              aria-expanded={Boolean(anchorElNav)}
              onClick={handleOpenNavMenu}
              sx={{
                color: "#8D7AB8",
                borderRadius: 3,
                "&:hover": {
                  bgcolor: "rgba(141, 122, 184, 0.12)",
                },
              }}
            >
              <MenuRounded />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              slotProps={{
                paper: {
                  sx: {
                    mt: 1,
                    minWidth: 210,
                    borderRadius: 3.5,
                    bgcolor: (theme: any) =>
                      theme.palette.mode === "light"
                        ? "rgba(255, 255, 255, 0.94)"
                        : "rgba(22, 20, 30, 0.96)",
                    backdropFilter: "blur(18px)",
                    border: "1px solid",
                    borderColor: "divider",
                    boxShadow: "0 12px 32px rgba(50, 40, 80, 0.12)",
                    backgroundImage: "none",
                    p: 0.7,
                  },
                },
              }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.to}
                  component={Link}
                  to={item.to}
                  selected={isActive(item.to)}
                  onClick={handleCloseNavMenu}
                  sx={{
                    minHeight: 46,
                    gap: 1.2,
                    borderRadius: 2.5,
                    my: 0.3,
                    color: isActive(item.to) ? "#8D7AB8" : "text.primary",
                    fontWeight: isActive(item.to) ? 750 : 600,
                    "&.Mui-selected": {
                      bgcolor: "rgba(141, 122, 184, 0.13)",
                    },
                    "&.Mui-selected:hover, &:hover": {
                      bgcolor: "rgba(141, 122, 184, 0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "#8D7AB8",
                    }}
                  >
                    {item.icon}
                  </Box>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User profile menu */}
          <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
            <UserInfo actualName={actualName} email={email} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
