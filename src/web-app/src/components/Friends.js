import {VStack, Text, Button, Center, Circle,
		HStack, useColorMode, Link } from "@chakra-ui/react";
import User from "./User";
import React from "react";

function Friends() {
	const { colorMode } = useColorMode();
	const friendsList = [{name: "Bret", status: "online"},
						{ name: "Richard", status: "online"},
						{ name: "Mohammad", status: "offline"}]

	return <Center>
		<VStack spacing="4" pt="150px">
			{friendsList.map(friend => (
				<Link _hover={{textDecoration: "none"}} href={`friends/user/${friend.name}`}>
					<Button w="250px" rounded="xl" size="lg"
						bg={colorMode === "light" ? "gray.300" : "gray.700"}>
						<HStack spacing="2">
						<Circle size="8px" bg={friend.status === "online" ? "green.400" : "red.500"}/>
						<Text>{friend.name}</Text>
						</HStack>
					</Button>
				</Link>
			))}
		</VStack>

	</Center>
}

export default Friends;