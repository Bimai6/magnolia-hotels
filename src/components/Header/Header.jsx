import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Box, Button } from "@mui/material";
import ContactSlider from "../ContactSlider/ContactSlider";

const navItems = [
  { label: 'Inicio', value: 'home', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/isotype_idmria.svg', link: '/' },
  { label: 'Estancia', value: 'book', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/bed_2_kda2wz.svg', link: '/my-reservations' },
  { label: 'Restaurante', value: 'restaurant', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/restaurant_d16z1c.svg', link: '/restaurant' },
  { label: 'Contacto', value: 'contact', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/contact_incmt5.svg' },
  { label: 'Identificarse', value: 'profile', icon: 'https://res.cloudinary.com/dk1g12n2h/image/upload/v1738865406/profile_d9xatr.svg', link: '/profile' },
];

function DesktopHeader() {

  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none" }}>
          <Toolbar>
            <IconButton
              component={Link}
              to="/"
              size="large"
              edge="start"
              aria-label="logo"
              disableRipple
            >
              <img 
                src="https://res.cloudinary.com/dk1g12n2h/image/upload/v1739173714/IMG-20250202-WA0012_1_eic08v.png" 
                alt="Logo"
                style={{ objectFit: "contain", width: "200px", height: "auto" }} 
              />
            </IconButton>
            <Box sx={{ ml: "auto", display: "flex", gap: 8 }}>
              {navItems.slice(1).map((item) => (
                item.value === "contact" ? (
                  <Button
                    key={item.value}
                    onClick={() => setIsContactOpen(true)}
                    sx={{
                      color: "black",
                      textTransform: "none",
                      fontSize: "18px",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        display: "block",
                        width: 0,
                        height: "2px",
                        background: "black",
                        transition: "width .3s",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.value}
                    component={Link}
                    to={item.link}
                    sx={{
                      color: "black",
                      textTransform: "none",
                      fontSize: "18px",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        display: "block",
                        width: 0,
                        height: "2px",
                        background: "black",
                        transition: "width .3s",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                      },
                      "&:hover::after": {
                        width: "100%",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                )
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ContactSlider isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}

export default DesktopHeader;
