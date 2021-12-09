import React, { useState, useMemo } from "react";
import { Center, Text, Button, VStack, Image, useColorModeValue, Flex } from '@chakra-ui/react';
import { CloseIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import { useMatch , useLocation } from "react-router-dom";

import Dropzone, {useDropzone} from "react-dropzone";

function User() {
    const match = useMatch("friends/user/:userId");
    const userName = match.params.userId;
    const [ file, setFile ] = useState(null);

    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "40px",
        padding: "20px",
        borderWidth: 3,
        borderRadius: 25,
        borderColor: useColorModeValue("green.400", "gray.900"),
        borderStyle: "solid",
        backgroundColor: useColorModeValue("gray.400", "gray.800"),
        color: useColorModeValue("gray.800", "gray.300"),
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };


    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: 'image/*'});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="28px"
                  color={useColorModeValue("gray.700", "gray.300")}> {userName} </Text>
            <Image shadow="lg" h="15%" w="15%" rounded="2xl" alt="qr-code"
                   src={useColorModeValue("https://i.ibb.co/Fnjh4v2/qr-code-1.png",
                                        "https://i.ibb.co/VL7kpbS/qr-code.png")}/>

            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {( { getRootProps, getInputProps } ) => (
                    <section>
                        <div {...getRootProps({style})}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            <VStack pt="120px">
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