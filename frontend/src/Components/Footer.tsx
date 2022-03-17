import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Navbar = () => {
  return (
    // <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static" color="primary">
      <Container maxWidth="md">
        <Toolbar>
          <Typography variant="body1" color="inherit">
            &copy; Build by React + NodeJS
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
    // </Box>
  );
};

export default Navbar;
