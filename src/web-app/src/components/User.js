import { Center, Text, Button, VStack, Image, Link, useColorModeValue } from '@chakra-ui/react';
import { CloseIcon } from "@chakra-ui/icons";
import { useMatch } from "react-router-dom";
import Dropzone from "react-dropzone";
import DropFiles from "./DropFiles.js";

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

    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="26px"
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
                <Link href="/friends" _hover={{textDecoration: "none"}}>
                    <Button rounded="3xl" shadow="md" _hover={{bg: "gray.600"}}
                    bg={useColorModeValue("red.500", "red.700")}
                    color={useColorModeValue("gray.100", "gray.300")}
                    onClick={deleteFriend}>
                    <Text pl="3" color="gray.200">
                        Delete Friend </Text>
                    <CloseIcon w="30%" h="30%"/>
                </Button>
                </Link>
            </VStack>
        </VStack>
    </Center>

}

export default User;