import React, { useState, useMemo } from "react";
import { Center, Text, Button, VStack, Image, useColorModeValue, Flex } from '@chakra-ui/react';
import { CloseIcon } from "@chakra-ui/icons";
import { useMatch } from "react-router-dom";
import Dropzone from "react-dropzone";
import DropFiles from "./DropFiles.js";

function User() {
    const match = useMatch("friends/user/:userId");
    const userName = match.params.userId;
    const [ file, setFile ] = useState(null);

    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="28px"
                  color={useColorModeValue("gray.600", "gray.300")}> {userName} </Text>
            <Image shadow="lg" h="13%" w="13%" rounded="2xl" alt="qr-code"
                   src={useColorModeValue("https://i.ibb.co/Fnjh4v2/qr-code-1.png",
                                        "https://i.ibb.co/VL7kpbS/qr-code.png")}/>

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {( { getRootProps, getInputProps } ) => (
                    <DropFiles getRootProps={getRootProps} getInputProps={getInputProps}
                                userName={userName}/>
                )}
            </Dropzone>

            <VStack pt="120px">
                <Button rounded="3xl" shadow="md" _hover={{bg: "gray.600"}}
                    bg={useColorModeValue("red.500", "red.700")}
                    color={useColorModeValue("gray.100", "gray.300")}>
                    <Text pl="3" color="gray.200">
                        Delete Friend </Text>
                    <CloseIcon w="30%" h="30%"/>
                </Button>
            </VStack>
        </VStack>
    </Center>

}

export default User;