import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CoverImages from "./Components/image/CoverImges";
import Footer from "./Components/Footer";
import Box from "@mui/material/Box";
import Photos from "./Components/image/Photos";

function App() {
  return (
    <>
      <Navbar />
      <Box sx={{ height: "100%", width: "100%", padding: "0 100px" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CoverImages />}></Route>
            <Route path="/album/:id" element={<Photos />}></Route>
          </Routes>
        </BrowserRouter>
      </Box>
      <Footer />
    </>
  );
}

export default App;
