import { ReactNode } from "react";
import {
    Box,
    Text,
    Flex,
    Link,
    Stack,
    HStack,
    IconButton,
    useDisclosure,
    useColorMode,
    useColorModeValue
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";

const Links = ["Friends", "Profile", "About"];

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={"xl"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.300", "gray.600"),
        }}
        href={"#"}>
        {children}
    </Link>
);

export default function Simple() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box boxShadow="md" bg={useColorModeValue('gray.200', 'gray.900')} px={4}>
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <IconButton
                        size="md"
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        display={{ md: "none" }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems="center">
                        <HStack
                            as="nav"
                            spacing="4"
                            display={{ base: "none", md: "flex" }}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </HStack>
                    </HStack>

                    <Flex alignItems="center">
                        <Text bgGradient={colorMode === "light" ?
                                "linear(to-r, gray.600, gray.800)":
                                "linear(to-l, gray.300, gray.200)"}
                              bgClip="text" fontSize="3xl" fontWeight="bold">
                            Fast Drop</Text>
                    </Flex>

                    <Flex alignItems="center">
                        <IconButton icon={ colorMode === "light" ? <SunIcon/> : <MoonIcon/> }
                            onClick={toggleColorMode} sz="lg" rounded="xl"
                            backgroundColor={colorMode === "light" ? "gray.200" : "gray.700"}
                            _hover={{bg: useColorModeValue('gray.300', 'gray.600')}}/>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: "none" }}>
                        <Stack as={"nav"} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>

            <Box p={4}>Hello!</Box>
        </>
    );
}
