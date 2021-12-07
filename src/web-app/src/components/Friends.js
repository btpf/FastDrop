import {VStack, Text, Button, Center, Circle,
		HStack, useColorMode, useOutsideClick } from "@chakra-ui/react";
import PopupCard from "./PopupCard";
import React from "react";

function Friends() {
	const { colorMode } = useColorMode();
	const friendsList = [{name: "Bret", status: "online"},
						{ name: "Richard", status: "online"},
						{ name: "Mohammad", status: "offline"}]

	const ref = React.useRef();
	const [ isModalOpen, setIsModalOpen ] = React.useState(false);
	useOutsideClick({
		ref: ref,
		handler: () => setIsModalOpen(false)
	})

	function handleButtonClick(event) {
		{<PopupCard status={friendsList[0].status} />}
	}

	return <Center>
		<VStack spacing="4" pt="150px">
			{friendsList.map(friend => (
				<Button w="250px" rounded="xl" size="lg" onClick={handleButtonClick()}
						bg={colorMode === "light" ? "gray.200" : "gray.700"}>
					<HStack spacing="2">
					<Circle size="8px" bg={friend.status === "online" ? "green.400" : "red.500"}/>
					<Text>{friend.name}</Text>
					</HStack>
				</Button>
			))}
		</VStack>

	</Center>
}

export default Friends;