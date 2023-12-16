/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Robot from "../media/robot.gif";
import Logout from './Logout';

function Welcome({currentUser}) {
  return (
    <Container>
        <Logout />
        <img src={Robot} alt="Robot" />
        <h1>
            Welcome, <span>{currentUser.username}!</span>
        </h1>
        <h3>
            Start chatting with your friends.
        </h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-direction: column;
    img {
        height: 20rem;
    }
    span {
        color: #9e3e9f;
    }
`;

export default Welcome