// src/components/Header.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import UserInfo from "./UserInfo";

interface HeaderProps {
  actualName: string;
  email: string;
  userName :string;
}

function Header({ actualName, email,userName}: HeaderProps) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky" sx={{ background: "#1976d2" }}>
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/home"
          sx={{
            mr: 2,
            fontWeight: "bold",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          JournalApp
        </Typography>

        {/* Desktop Nav Links */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            component={Link}
            to="/home"
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/home/journal"
            sx={{ my: 2, color: "white", display: "block" }}
          >
            My Journals
          </Button>
          <Button
            component={Link}
            to="/home/about"
            sx={{ my: 2, color: "white", display: "block" }}
          >
            About
          </Button>
        </Box>

        {/* Mobile Hamburger Menu */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="menu"
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
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            keepMounted
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuItem component={Link} to="/home" onClick={handleCloseNavMenu}>
              Home
            </MenuItem>
            <MenuItem
              component={Link}
              to="/home/journal"
              onClick={handleCloseNavMenu}
            >
              My Journals
            </MenuItem>
            <MenuItem
              component={Link}
              to="/home/about"
              onClick={handleCloseNavMenu}
            >
              About
            </MenuItem>
          </Menu>
        </Box>

        {/* User Info on Right */}
        <UserInfo actualName={actualName} email={email} userName={userName} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
