import { useState, useReducer } from "react";
import {
    Center, Text, useColorModeValue,
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
        <VStack pt="150px" spacing="24">
            <Text fontWeight="bold" fontSize="26px"
                color={useColorModeValue("gray.600", "gray.300")}>
                Waiting for files...
            </Text>

            <VStack divider={<StackDivider/>} spacing="8">
                {files.map((f, index) => (
                    <HStack key={index}>
                        <Text> {f.fileName}</Text>
                        <Progress w="300px" h="10px" rounded="xl"
                            value={(f.currentChunk / f.chunks) * 100}/>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    </Center>
}

export default Home;