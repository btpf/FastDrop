import {
	VStack, Text, Button, Center, Circle, useToast, Flex, Spacer, Stack,
	HStack, useColorMode, Link, Input, InputGroup, InputRightElement
} from "@chakra-ui/react";
import { useState } from "react";
import User from "./User";

function Friends() {
	let friendsList = [{name: "Bret", status: "online"},
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
			const newFriend = {name: input, status: "offline"}
			const newFriends = [];
			for (let f of friends) newFriends.push(f);
			newFriends.push(newFriend);
			setFriends(newFriends);
			setInput("");
		}
	}

	return <Center>
		<VStack spacing="4" pt="150px" align="stretch">
			{friends.map(friend => (
				<Link _hover={{textDecoration: "none"}} href={`friends/user/${friend.name}`}>
					<Button w="250px" rounded="xl" size="lg"
						bg={colorMode === "light" ? "gray.300" : "gray.700"}>
						<Text>{friend.name}</Text>
						<Spacer/>
						<Circle ml="5" size="8px"
								bg={friend.status === "online" ? "green.400" : "red.500"}/>
					</Button>
				</Link>
			))}
			<InputGroup>
				<Input rounded="xl" placeholder="Add a Friend!"
					   onChange={(event) => setInput(event.target.value)}>
				</Input>
				<InputRightElement> <Button rounded="xl" onClick={handleAddFriend}>
					Add </Button> </InputRightElement>
			</InputGroup>
		</VStack>

	</Center>
}

export default Friends;