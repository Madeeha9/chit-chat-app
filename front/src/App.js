import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Signup from "./pages/signup";
import Chat from "./pages/chat";
import Login from "./pages/login";
import SetProfile from "./pages/setProfile";

export default function App() {
  return (<BrowserRouter>
    <Routes>
      <Route path="/signup" element = {<Signup />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/setProfile" element = {<SetProfile />} />
      <Route path="/" element = {<Chat />} />
    </Routes>
  </BrowserRouter>);
}