import {
    Center, Link, Spacer, Flex, IconButton,
    Text, VStack, HStack, StackDivider, useColorMode
} from "@chakra-ui/react";
import { GrLinkedinOption, AiFillGithub, FaReact,
    SiWebrtc, SiSocketdotio, SiChakraui } from "react-icons/all"


function About() {
    const { colorMode } = useColorMode();

    const links = {
        "Bret Papkoff": ["https://www.linkedin.com/in/bret-papkoff/",
            "https://github.com/btpf"],
        "Richard Tsang": ["https://www.linkedin.com/in/richard-tsang-991191176/",
            "https://github.com/Richard-Tsang15"],
        "Mohammad Mahmud": ["https://www.linkedin.com/in/mhmahmud/",
            "https://github.com/Mohammad5566"]
    }

    const frontEnd = {
        "React": ["https://reactjs.org/", <FaReact/>],
        "Chakra UI": ["https://chakra-ui.com/", <SiChakraui/>]
    }
    const backEnd = {
        "WebRTC": ["https://webrtc.org/", <SiWebrtc/>],
        "Socket IO": ["https://socket.io/", <SiSocketdotio/>]
    }

    return <Center>
        <VStack spacing="8" w="200px">
        <VStack align="stretch" pt="150px" divider={<StackDivider/>}>
            <Text fontSize="xl" align="center" fontWeight="bold"> Built by </Text>
            {Object.entries(links).map(([key, value]) => (
                <HStack justify="space-between" w="350px">
                    <Text fontSize="md">{key}</Text> <Spacer />
                    <Link href={value[0]} isExternal>
                        <IconButton icon={<GrLinkedinOption/>} rounded="lg"
                                    bg={colorMode === "light" ? "gray.300" : "gray.700"}/>
                    </Link>
                    <Link href={value[1]} isExternal>
                        <IconButton icon={<AiFillGithub/>} rounded="lg"
                                    bg={colorMode === "light" ? "gray.300" : "gray.700"}/>
                    </Link>
                </HStack>
            ))}

        </VStack>

        <Flex>
            <VStack divider={<StackDivider/>}>
                <Text fontSize="xl" align="center" fontWeight="bold"> Using </Text>
                <HStack justify="space-between" w="350px">
                <Text>Front End</Text>
                    <HStack justify="space-between">{Object.entries(frontEnd).map(([key, value]) => (
                        <Link href={value[0]} isExternal="true">
                            <IconButton icon={value[1]} bg={colorMode === "light" ? "gray.300" : "gray.700"}/>
                        </Link>
                    ))}</HStack>
                </HStack>
                <HStack justify="space-between" w="350px">
                    <Text>Back End</Text>
                    <HStack justify="space-between">{Object.entries(backEnd).map(([key, value]) => (
                        <Link href={value[0]} isExternal="true">
                            <IconButton icon={value[1]} bg={colorMode === "light" ? "gray.300" : "gray.700"}/>
                        </Link>
                    ))}</HStack>
                </HStack>
            </VStack>
        </Flex>

            <Link href="https://github.com/btpf/FastDrop" isExternal="true">
                <IconButton icon={<AiFillGithub/>} bg={colorMode === "light" ? "gray.300" : "gray.700"} />
            </Link>
        </VStack>
    </Center>
}

export default About;