import { Text } from '@chakra-ui/react';
import { useMatch , useLocation } from "react-router-dom";
import React from "react";

function User({ match, location }) {
    const m = useMatch("/friends/user/:userId");
    console.log(m);
    return <div>

    </div>
}

export default User;