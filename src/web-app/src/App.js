import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Navbar from "./components/Navbar.js";
import About from "./components/About.js";
import Friends from "./components/Friends.js";
import Profile from "./components/Profile.js";
import User from "./components/User.js";
import Home from "./components/Home.js";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    let friendsList = [
        { name: "Bret", status: "online" },
        { name: "Richard", status: "online" },
        { name: "Mohammad", status: "offline" }
    ]

    const [ friends, setFriends ] = useState(friendsList);

    return <BrowserRouter>
        <ChakraProvider theme={theme}>
            <Navbar/>

            <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route path="about" element={<About/>} />
                <Route path="profile" element={<Profile/>} />
                <Route path="friends" element={<Friends/>} />
                <Route path="/friends/user/:userId" element={<User
                    friendsList={friendsList} setFriends={setFriends}/>} />
            </Routes>

        </ChakraProvider>
    </BrowserRouter>
}

export default App;
