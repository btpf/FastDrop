import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Friends from "./components/Friends.js";
import Profile from "./components/Profile.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return <BrowserRouter>
        <ChakraProvider theme={theme}>
            <Navbar/>

            <Routes>
                <Route path="About" element={<About/>} />
                <Route path="Friends" element={<Friends/>} />
                <Route path="Profile" element={<Profile/>} />
            </Routes>

        </ChakraProvider>
    </BrowserRouter>
}

export default App;
