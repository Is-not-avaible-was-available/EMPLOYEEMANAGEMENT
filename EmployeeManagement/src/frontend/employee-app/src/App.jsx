import React  from "react";
import ListEmployeeComponent from "./components/ListEmployeeComponent"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AddEmployeeComponent from "./components/AddEmployeeComponent";

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/edit-employee/:id" element={<AddEmployeeComponent/>}></Route>
      <Route path="/" element={<ListEmployeeComponent/>}></Route>
      <Route path="/employees" element={<ListEmployeeComponent/>}></Route>
      <Route path="/add-employee" element={<AddEmployeeComponent/>}></Route>
      
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
