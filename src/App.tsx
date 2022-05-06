import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Circle from "./Circle";

function App() {
  const [username, setUsername] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.currentTarget.value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event.target);
  };

  return (
    <>
      <div>
        <Circle bgColor="tomato" text="ddd" />
        <Circle bgColor="teal" borderColor="red" />
      </div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="username" value={username} onChange={onChange} required />
        <button>Log In</button>
      </form>
    </>
  );
}

export default App;
