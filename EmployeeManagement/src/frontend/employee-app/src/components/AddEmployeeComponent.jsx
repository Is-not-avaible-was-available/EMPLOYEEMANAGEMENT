
import React, { useState } from "react";
import { addEmployee } from "../services/employeeService";
import { useNavigate  } from "react-router-dom";

const AddEmployeeComponent = () =>{

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[title, setTitle] = useState("");

    const handleFirstName =(e)=> setFirstName(e.target.value);
    
    const handleLastName =(e)=> setLastName(e.target.value);
    
    const handleEmail =  (e)=> setEmail(e.target.value);
    
    const handlePassword  = (e)=> setPassword(e.target.value);
    
    const handleTitle  = (e)=> setTitle(e.target.value);

    const navigate = useNavigate();
    

    function handleClick(e){
        e.preventDefault();
        const employee = {
            firstName, lastName, email, password, title
        }
        console.log(employee);
        addEmployee(employee).then((response)=>{console.log(response.data)});

        navigate("/employees");
    }

    return(
        <div className="container">
        <div className="card"> 
             <h2 className="text-center">Add Employee</h2>
            <div className="card-body">

            <form>
            <div className="mb-6 col-auto">
             <label htmlFor="firstName" className="form-label">FirstName</label>
             <input type="text" className="form-control" id="firstName" value={firstName} onChange={handleFirstName} autoComplete="firstName"/>
             </div>
             <div className="mb-6 col-auto">
             <label htmlFor="lastName" className="form-label">Last Name</label>
             <input type="text" className="form-control" id="lastName" value={lastName} onChange={handleLastName} autoComplete="lastName"/>
             </div>
             <div className="mb-6 col-auto">
             <label htmlFor="title" className="form-label">Title</label>
             <input type="text" className="form-control" id="title" value={title} onChange={handleTitle} autoComplete="title"/>
             </div>
              <div className="mb-6 col-auto">
             <label htmlFor="email" className="form-label">Email address</label>
             <input type="email" className="form-control" id="email" value={email} onChange={handleEmail} autoComplete="email"/>
             </div>
             <div className="mb-6 col-auto">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password"value={password} onChange={handlePassword} autoComplete="password"/>
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
            </div>
        </div>
        </div>        
    );
}

export default AddEmployeeComponent;