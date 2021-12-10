import { Button, Center, Image, Text, useColorModeValue, VStack } from "@chakra-ui/react";

function Profile() {
    return <Center>
        <VStack pt="50px" spacing="8">
            <Text fontWeight="bold" fontSize="26px"
                  color={useColorModeValue("gray.600", "gray.300")}> My Name </Text>
            <Image shadow="lg" h="13%" w="13%" rounded="2xl" alt="qr-code"
                   src={useColorModeValue("https://i.ibb.co/Fnjh4v2/qr-code-1.png",
                       "https://i.ibb.co/VL7kpbS/qr-code.png")}/>

            <VStack pt="40px" spacing="4">
                <Text fontSize="xl" align="center" fontWeight="bold"> File Sharing History </Text>
                <Button rounded="2xl" w="200px"> File 1 </Button>
                <Button rounded="2xl" w="200px"> File 2 </Button>
                <Button rounded="2xl" w="200px"> File 3 </Button>
            </VStack>
        </VStack>
    </Center>
}
export default Profile;