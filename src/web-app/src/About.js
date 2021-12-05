import {Center, Link, Spacer, Button, IconButton, Text, VStack, HStack, StackDivider} from "@chakra-ui/react";
import { GrLinkedinOption, AiFillGithub, FaReact, SiWebrtc } from "react-icons/all"

const links = {
    "Bret Papkoff": ["https://www.linkedin.com/in/bret-papkoff/", "https://github.com/btpf"],
    "Richard Tsang": ["https://www.linkedin.com/in/richard-tsang-991191176/", "https://github.com/Richard-Tsang15"],
    "Mohammad Mahmud": ["https://www.linkedin.com/in/mhmahmud/", "https://github.com/Mohammad5566"]
}

function About() {
    return <Center>


        <VStack  alignItems="stretch">
            <Text fontSize="xl" align="center" fontWeight="bold"> Built by </Text>
            {Object.entries(links).map(([key, value]) => (
                <HStack justify="space-between" w="350px">

                    <Text fontSize="md">{key}</Text> <Spacer />
                    <Link href={value[0]} isExternal>
                        <IconButton icon={<GrLinkedinOption/>} rounded="lg" />
                    </Link>
                    <Link href={value[1]} isExternal>
                        <IconButton icon={<AiFillGithub/>} rounded="lg" />
                    </Link>

                </HStack>
            ))}
        </VStack>
    </Center>
}

export default About;