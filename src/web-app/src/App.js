import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Friends from "./components/Friends.js";
import Profile from "./components/Profile.js";
import User from "./components/User.js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return <BrowserRouter>
        <ChakraProvider theme={theme}>
            <Navbar/>

            <Routes>
                <Route path="about" element={<About/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="friends" element={<Friends/>} />
                <Route path="/friends/:userId" element={<User/>} />
            </Routes>

        </ChakraProvider>
    </BrowserRouter>
}

export default App;
