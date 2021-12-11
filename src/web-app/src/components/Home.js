import { useState, useReducer } from "react";
import {
    Center, Text, useColorModeValue, Box, Spacer,
    VStack, Progress, HStack, StackDivider
} from "@chakra-ui/react";

import libFastDrop from '../../../lib/libfastdrop'

const lib = libFastDrop.getInstance();

function Home() {

    const [ files, setFiles ] = useState(lib.getFileTransfers());
    const [ ignored, forceUpdate ] = useReducer(x => x + 1, 0);

    lib.fileDetailsUpdate = (files) => {
        console.log(files);
        console.log(files[0].currentChunk);
        setFiles(files);
        forceUpdate();
    }

    return <Center>
        <VStack pt="100px" spacing="24">
            <Text fontWeight="bold" fontSize="26px"
                color={useColorModeValue("gray.600", "gray.300")}>
                {files.length === 0 ? "Waiting for files..." : "Files Shared"}
            </Text>

            <Box rounded="lg" p="50px" bgColor={useColorModeValue("gray.300", "gray.700")}>
                <VStack divider={<StackDivider/>} spacing="8">
                    {files.map((f, index) => (
                        <HStack key={index} w="700px" justify="space-between">
                            <Text maxW="350px" > {f.fileName}</Text>
                            <Progress w="250px" h="10px" rounded="xl"
                                value={(f.currentChunk / f.chunks) * 100}/>
                        </HStack>
                    ))}
                </VStack>
            </Box>
        </VStack>
    </Center>
}

export default Home;