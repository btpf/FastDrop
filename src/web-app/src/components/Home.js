import {
    Center, Text, useColorModeValue,
    HStack, Progress, Button
} from "@chakra-ui/react";
import { useState } from "react";

function Home( { acceptedFiles }) {
    const [ curVal, setVal ] = useState(0);

    function updateValue() {
        setVal(curVal + 1);
    }

    return <Center>
        <HStack pt="150px">
            <Text fontWeight="bold" fontSize="26px"
                color={useColorModeValue("gray.600", "gray.300")}>
                Waiting for files...
            </Text>

            <Button onClick={updateValue}> Test </Button>
            <Progress value={curVal} color="gray.100" rounded="2xl"/>

        </HStack>
    </Center>
}

export default Home;