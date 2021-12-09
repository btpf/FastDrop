import {Text, useColorModeValue} from "@chakra-ui/react";
import React, {useMemo} from "react";
import {useDropzone} from "react-dropzone";

function DropFiles({ userName }) {
    const baseStyle = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
        marginBottom: "-10px",
        padding: "60px",
        borderWidth: 3,
        borderRadius: 20,
        borderColor: useColorModeValue("green.400", "gray.900"),
        borderStyle: "solid",
        backgroundColor: useColorModeValue("gray.400", "gray.800"),
        color: useColorModeValue("gray.800", "gray.300"),
        transition: 'border .24s ease-in-out'
    };

    const activeStyle = {
        borderColor: "#FFFFFF"
    };

    const acceptStyle = {
        borderColor: useColorModeValue("green.800", "green.300")
    };

    const rejectStyle = {
        borderColor: "#63171B"
    };

    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject
    } = useDropzone({accept: 'image/*'});

    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

    return <section>
        <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <Text fontSize="lg" color={useColorModeValue("gray.600", "gray.500")}>
                Drag and drop files here to share with {userName}
            </Text>
        </div>
    </section>
}

export default DropFiles;