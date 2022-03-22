import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "components/Navbar";
import CoverImages from "components/image/CoverImges";
import Footer from "components/Footer";
import Box from "@mui/material/Box";
import Photos from "components/image/Photos";
import Login from "components/Login";

import { store } from "store/store";
import { Provider } from "react-redux";

import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    },
  },
});

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar />

            <Box sx={{ height: "100%", width: "100%", padding: "0 100px" }}>
              <Routes>
                <Route path="/" element={<CoverImages />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/album/:id" element={<Photos />}></Route>
              </Routes>
            </Box>

            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
