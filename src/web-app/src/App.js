import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Navbar from "./components/Navbar.js";

import About from "./About.js"
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return <BrowserRouter>
        <ChakraProvider theme={theme}>
            <Navbar/>

            <Routes>
                <Route path="about" element={<About/>} />
            </Routes>

        </ChakraProvider>
    </BrowserRouter>
}

export default App;
