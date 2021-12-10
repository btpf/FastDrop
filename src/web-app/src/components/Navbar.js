import {
    Box,
    Text,
    Flex,
    Link,
    Stack,
    Button,
    HStack,
    IconButton,
    useDisclosure,
    useColorMode,
    useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

const Links = ["Friends", "Profile", "About"];

const NavLink = ({ children }) => (
    <Link
        px="2"
        py="1"
        rounded="xl"
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.300", "gray.600"),
        }}
        href={children.key}>
        {children}
    </Link>
);

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return <Box boxShadow="md" bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
        <Flex h="16" alignItems="center" justifyContent="space-between" >
        <Flex display={{ base: "flex", md: "none" }} basis="25%" justify="flex-start">
            <IconButton
                size="lg" rounded="xl"
                bgColor={useColorModeValue("gray.300", "gray.700")}
                _hover={{bg: useColorModeValue("gray.400", "gray.600")}}
                icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>} display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}/>
</Flex>
            <Flex display={{ base: "none", md: "flex" }} basis="25%" justify="flex-start">
                <HStack
                    as="nav"
                    spacing="4"
                    display={{ base: "none", md: "flex" }}>

                    {Links.map((link, index) => (
                    <Link href={`/${link.toLowerCase()}`} _hover={{textDecoration: "none"}} key={index}>
                        <Button size="md" rounded="2xl" boxShadow="md" key={link}
                            bgColor={ colorMode === "light" ? "gray.300" : "gray.700" }>
                            {link}</Button>
                    </Link>))}
                </HStack>
            </Flex>

            <Flex >
                <Link href="/" _hover={{textDecoration: "none"}}>
                    <Text bgGradient={colorMode === "light" ?
                    "linear(to-r, gray.600, gray.800)":
                    "linear(to-l, gray.300, gray.200)"}
                      bgClip="text" fontSize="3xl" fontWeight="bold"
                    fontSize={{ md: "36px", base: "25px"}}>
                    Fast Drop</Text>
                </Link>
            </Flex>

            <Flex basis="25%" justify="end">
            <IconButton icon={ colorMode === "light" ? <SunIcon/> : <MoonIcon/> }
                onClick={toggleColorMode} size="lg" rounded="2xl" boxShadow="sm"
                bgColor={useColorModeValue("gray.300", "gray.700")}
                _hover={{bg: useColorModeValue("gray.400", "gray.600")}}/>
            </Flex>

        </Flex>

        {isOpen ? (
            <Box pb="4" display={{ md: "none" }} >
                <Stack as="nav" spacing="4">
                    {Links.map((link) => (
                        <Link href={`/${link.toLowerCase()}`} _hover={{textDecoration: "none"}}>
                            {link}</Link>))}
                </Stack>
            </Box>
        ) : null}
    </Box>
}

export default Navbar;
