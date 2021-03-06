import {
    Box,
    Text,
    Flex,
    Stack,
    Button,
    HStack,
    IconButton,
    useDisclosure,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import libFastDrop from '../../../lib/libfastdrop'

const friends = {
    receiver: ["sender"],
    sender: ["receiver"]
}

const user = {
    alias: "receiver",
    uid: "receiver",
    secret: "TODO"
}

let fastdrop = libFastDrop.getInstance({
    user,
    friends: friends[user.uid],
    config: {
        socketConfig: null,
        RTCPeerConnectionConfig: {
            mandatory: {
                // offerToReceiveAudio: true
            },
            iceServers: [
                {
                    urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
                },
            ],
            iceCandidatePoolSize: 10,
        }
    }
})

const Links = ["Friends", "Profile", "About"];

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return <Box boxShadow="md" bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h="16" alignItems="center" justifyContent="space-between" >
        <Flex display={{ base: "flex", md: "none" }} basis="25%" justify="flex-start">
            <IconButton
                size="lg" rounded="xl"
                bgColor={useColorModeValue("gray.200", "gray.900")}
                _hover={{bg: useColorModeValue("gray.400", "gray.600")}}
                icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>} display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}/>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }} basis="25%" justify="flex-start">
            <HStack
                as="nav"
                spacing="1"
                display={{ base: "none", md: "flex" }}>

                {Links.map((link, index) => (
                <Link to={`/${link.toLowerCase()}`} _hover={{textDecoration: "none"}} key={index}>
                    <Button size="md" rounded="2xl" key={link}
                        bgColor={ colorMode === "light" ? "gray.200" : "gray.900" }>
                        {link}</Button>
                </Link>))}
            </HStack>
        </Flex>

        <Flex >
            <Link to="/" _hover={{textDecoration: "none"}} key="0">
               <Text bgGradient={colorMode === "light" ?
                "linear(to-r, gray.600, gray.800)":
                "linear(to-r, gray.300, gray.400)"}
                  bgClip="text" fontSize="3xl" fontWeight="bold"
                fontSize={{ md: "34px", base: "25px"}}>
                FastDrop</Text>
            </Link>
        </Flex>

        <Flex basis="25%" justify="end">
            <IconButton icon={ colorMode === "light" ? <SunIcon/> : <MoonIcon/> }
            onClick={toggleColorMode} size="lg" borderRadius="400px"
            bgColor={useColorModeValue("gray.200", "gray.900")}
            _hover={{bg: useColorModeValue("gray.400", "gray.600")}}/>
        </Flex>
        </Flex>

        {isOpen ? (
            <Box pb="4" display={{ md: "none" }} >
                <Stack as="nav" spacing="4">
                    {Links.map((link, index) => (
                    <Link to={`/${link.toLowerCase()}`} _hover={{textDecoration: "none"}} key={index}>
                        {link}</Link>))}
                </Stack>
            </Box>
        ) : null}
    </Box>
}

export default Navbar;
