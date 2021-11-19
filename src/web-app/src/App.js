import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar.js";
import theme from "./theme.js";

function App() {
  return <ChakraProvider theme={theme}>
      <Navbar/>
  </ChakraProvider>
}

export default App;
