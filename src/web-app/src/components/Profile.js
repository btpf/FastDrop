import { Button, Center, Image, Text, useColorModeValue, VStack, Flex } from "@chakra-ui/react";

function Profile( { files } ) {
    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="26px"
                  color={useColorModeValue("gray.600", "gray.300")}> My Name </Text>
            <Image shadow="lg" h={{base: "20%", md: "13%"}} w={{base: "20%", md: "13%"}}
                   rounded="2xl" alt="qr-code"
                   src={useColorModeValue("https://i.ibb.co/Fnjh4v2/qr-code-1.png",
                       "https://i.ibb.co/VL7kpbS/qr-code.png")}/>

            <Flex>
                <VStack pt="40px" spacing="4" >
                    <Text fontSize="xl" align="center" fontWeight="bold"> File Sharing History </Text>
                    {files.map((f) => (
                        <Button p="20px"> {f.fileName} </Button>
                    ))}
                </VStack>
            </Flex>
        </VStack>
    </Center>
}
export default Profile;