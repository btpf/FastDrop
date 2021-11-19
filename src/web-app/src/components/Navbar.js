import React from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { HStack, Text, Center, Flex, Spacer, IconButton, useColorMode } from "@chakra-ui/react";

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();

    return <Flex w="100%" h="4%" bgColor="gray.300">

            <Center><Text size="62px" justify="flex-center">Fast Drop</Text></Center>

            <Spacer/>

            <IconButton icon={colorMode === "light" ? <SunIcon/> : <MoonIcon/>} mr="15px" my="5px"
                        onClick={toggleColorMode} rounded="lg" size="md" justify="flex-right"/>

    </Flex>
}

export default Navbar;