import axios from "axios";
import { useEffect, useState } from "react";
import Todo from "./components/Todo";
import Projects from "./components/Projects";
import Products from "./components/Products";

function App() {
  return (
    <>
      {/* <Todo /> */}
      {/* <Projects /> */}
      <Products />
    </>
  );
}

export default App;
