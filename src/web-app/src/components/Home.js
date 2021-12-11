import { useState } from "react";
import {
    Center, Text, useColorModeValue,
    VStack, Progress, Button
} from "@chakra-ui/react";

import libFastDrop from '../../../lib/libfastdrop'

const lib = libFastDrop.getInstance();

function Home( { acceptedFiles }) {
    const [ progressVal, setProgressVal ] = useState(0);

    lib.fileDetailsUpdate = (files) => {
        console.log(files);
    }

    function updateValue() {
        setProgressVal(progressVal + 1);
    }

    return <Center>
        <VStack pt="150px">
            <Text fontWeight="bold" fontSize="26px"
                color={useColorModeValue("gray.600", "gray.300")}>
                Waiting for files...
            </Text>

            <Button onClick={updateValue}> Test </Button>

            <Progress value={progressVal} w="500px" h="10px" rounded="2xl"/>
        </VStack>

    </Center>
}

export default Home;