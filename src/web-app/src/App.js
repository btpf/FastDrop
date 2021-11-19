import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import Simple from "./components/Simple.js";

function App() {
  return <ChakraProvider theme={theme}>
      <Simple/>
  </ChakraProvider>
}

export default App;
