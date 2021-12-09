import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { Center, Text, Button, VStack, Image, useColorModeValue, IconButton } from '@chakra-ui/react';
import { CloseIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useMatch , useLocation } from "react-router-dom";

function User() {
    const match = useMatch("friends/user/:userId");
    const userName = match.params.userId;
    const [ file, setFile ] = useState(null);

    function handleChange(file) {
        setFile(file);
        <Image src="file"/>
    }

    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="28px"> {userName} </Text>
            <Image shadow="lg" h="15%" w="15%" rounded="2xl" alt="qr-code"
                   src={useColorModeValue("https://i.ibb.co/Fnjh4v2/qr-code-1.png",
                                        "https://i.ibb.co/VL7kpbS/qr-code.png")}/>

            <VStack pt="250px">
                <Button rounded="3xl" shadow="md" _hover={{bg: "gray.600"}}
                    bg={useColorModeValue("red.500", "red.500")}
                    color={useColorModeValue("gray.100", "gray.300")}>
                    <Text pl="3"> Delete Friend </Text>
                    <CloseIcon w="30%" h="30%"></CloseIcon>
                </Button>
            </VStack>

        </VStack>
    </Center>

}

export default User;