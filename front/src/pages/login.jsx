/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import Logo from "../media/logo.svg";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState( {
    username: "",
    password: "", 
  } );
  useEffect( () => {
    if(localStorage.getItem("chit-chat-user")) {
      navigate('/');
    }
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(handleValidation()) {
      // console.log("validated", loginRoute);
      const {username, password} = values;
      const {data} = await axios.post(loginRoute, {username, password});
      
      if(data.status === false) {
        toast.error(data.msg, toastOptions);
      }

      if(data.status === true) {
        localStorage.setItem('chit-chat-user', JSON.stringify(data.user));
        navigate("/");
      }

    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
    pauseOnHover: true,
    draggable: true
  };

  const handleValidation = () => {
    const {username, password} = values;

    if (username.length === 0) {
      toast.error("Username is required.", toastOptions);
      return false;
    }
    else if(password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit = {(event)=> handleSubmit(event)} >
          <div className="brand">
            <img src = {Logo} alt = "Logo" />
            <h1>Chit Chat</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={(e) => handleChange(e)} />
          <input type="password" placeholder='Password' name='password' onChange={(e) => handleChange(e)} />
          
          <button type='submit'>Login</button>

        </form>
        <span>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  widht: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img{
      height: 5rem;
    }

    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border-radius: 0.4rem;
    border: 0.1rem solid #3e3e9f;
    color: white;
    width: 100%;
    font-size: 1rem;

    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  button {
    background-color: #3e3e9f;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;

    &:hover {
      background-color: #3e3e9f;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #3e3e9f;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;