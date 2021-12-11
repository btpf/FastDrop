import { Center, Text, Button, VStack, Image, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon, LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { useMatch } from "react-router-dom";
import Dropzone from "react-dropzone";
import DropFiles from "./DropFiles.js";
import { Link } from "react-router-dom";
import { useState } from "react";

import libFastDrop from '../../../lib/libfastdrop';

let fastdrop = libFastDrop.getInstance();

function User({ friendsList, setFriends }) {
    const match = useMatch("/friends/user/:userId");
    const userName = match.params.userId;

    function deleteFriend() {
        const newFriendsList = [...friendsList];
        let index = 0;
        for (let i = 0; i < newFriendsList.length; i += 1) {
            if (newFriendsList[i].name === userName) {
                index = i;
                break;
            }
        }
        newFriendsList.splice(index);
        setFriends(newFriendsList);
        console.log(friendsList);
    }

    const [ encryptionText, setEncryptionText ] = useState(0);

    function handleEncryption() {
        setEncryptionText(!encryptionText);
    }

    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="26px"
                  color={useColorModeValue("gray.600", "gray.300")}> {userName} </Text>
            <Image shadow="lg" h="13%" w="13%" rounded="2xl" alt="qr-code"
                   src={useColorModeValue("https://i.ibb.co/Fnjh4v2/qr-code-1.png",
                                        "https://i.ibb.co/VL7kpbS/qr-code.png")}/>

            <Button rounded="3xl" onClick={handleEncryption} w="150px"
                    bgColor={useColorModeValue("gray.200")}
                    color={ !encryptionText ? "green.400" : "red.400" }>
                <Text pr="2"> {encryptionText ? "Unencrypted" : "Encrypted" } </Text>
                { encryptionText === "Encrypted" ? <LockIcon/> : <UnlockIcon/> }
            </Button>


            <Dropzone onDrop={acceptedFiles => {
                if (acceptedFiles.length > 1) {
                    /* TODO: Add a toast warning*/
                    return;
                }
                fastdrop.sendBytes("receiver", acceptedFiles[0]);
            }}>
                {( { getRootProps, getInputProps } ) => (
                    <DropFiles getRootProps={getRootProps} getInputProps={getInputProps}
                                userName={userName}/>
                )}
            </Dropzone>

        </VStack>
    </Center>
}

export default User;