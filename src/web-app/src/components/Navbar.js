import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { HStack, Text, Center, IconButton, useColorMode } from "@chakra-ui/react";

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return <HStack>
        <Center><Text size="lg">Fast Drop</Text></Center>


        <IconButton icon={colorMode === "light" ? <SunIcon/> : <MoonIcon/>}
                    onClick={toggleColorMode} rounded="lg" size="md"/>
    </HStack>
}

export default Navbar;