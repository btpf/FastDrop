import {
	VStack, Text, Button, Center, Circle, useToast, Spacer,
	HStack, useColorMode, Input, IconButton, useColorModeValue
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

function Friends() {
	let friendsList = [
		{ name: "Richard", status: "online"},
		{ name: "Mohammad", status: "offline"}]

	const toast = useToast();
	const { colorMode } = useColorMode();
	const [ input, setInput ] = useState("");
	const [ friends, setFriends ] = useState(friendsList);

	function handleAddFriend(event) {
		event.preventDefault();
		if (!input) {
			toast({
				position: "bottom",
				title: "Friend's name cannot be empty",
				duration: 2000,
				isClosable: true,
				variant: "subtle"
			})
		}
		else {
			setFriends([...friends, {name: "Bret", status: "online"}]);
		}
	}

	return <Center>
		<VStack spacing="4" pt="150px" align="stretch">
			{friends.map((friend, index) => (
				<Link key={index} _hover={{textDecoration: "none"}} to={`/friends/user/${friend.name}`}>
					<Button w="250px" rounded="xl" size="lg"
						bg={colorMode === "light" ? "gray.300" : "gray.700"}>
						<Text>{friend.name}</Text>
						<Spacer/>
						<Circle ml="5" size="8px"
								bg={friend.status === "online" ? "green.400" : "red.500"}/>
					</Button>
				</Link>
			))}

			<HStack pt="20px" spacing="2">
				<Input rounded="xl" placeholder="Add a Friend!"
					   onChange={(event) => setInput(event.target.value)}>
				</Input>
				<IconButton icon={<AddIcon/>} rounded="xl" onClick={handleAddFriend}
							bgColor={useColorModeValue("gray.300", "gray.700")} />
			</HStack>
		</VStack>

	</Center>
}

export default Friends;