
import React, { useEffect, useState } from "react";
import { addEmployee, getEmployee, updateEmployee } from "../services/employeeService";
import { useNavigate, useParams  } from "react-router-dom";

const AddEmployeeComponent = () =>{

    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[title, setTitle] = useState("");

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName: "",
        lastName : "",
        title: "",
        email : "",
        password : "",
    });

    const handleFirstName =(e)=> setFirstName(e.target.value);
    
    const handleLastName =(e)=> setLastName(e.target.value);
    
    const handleEmail =  (e)=> setEmail(e.target.value);
    
    const handlePassword  = (e)=> setPassword(e.target.value);
    
    const handleTitle  = (e)=> setTitle(e.target.value);

    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPassword(response.data.password);
                setTitle(response.data.title);
        }).catch(error => {
            console.error(error);
        })
    }
        
   }   , [id]);
    

    function handleClick(e){
        e.preventDefault();
       
        if(validateForm()){
            const employee = {
                firstName, lastName, email, password, title
            }
            if(id){
                updateEmployee(id, employee).then((response) => {
                console.log(response.data);
                navigate('/employees');
            }).catch(error=>{
                console.error(error);
            })

            }else{
                console.log(employee);
                addEmployee(employee).then((response)=>{
                    console.log(response.data);
                    navigate("/employees");
                }).catch(error=>{
                    console.error(error);
                });
            }
           
        }

        
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {...error};
        if(firstName.trim()){
            errorCopy.firstName = "";
        }else{
            errorCopy.firstName = "First name is required!";
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName = "";
        }else{
            errorCopy.lastName = "Last name is required!";
            valid = false;
        }

        if(email.trim()){
            errorCopy.email = "";
        }else{
            errorCopy.email = "Email is required!";
            valid = false;
        }

        if(password.trim()){
            errorCopy.password = "";
        }else{
            errorCopy.password = "Password is required!";
            valid = false;
        }

        if(title.trim()){
            errorCopy.title = "";
        }else{
            errorCopy.title = "Title is required!";
            valid = false;
        }

        setErrors(errorCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return  <h2 className="text-center">Update Employee</h2>;
        }else{
            <h2 className="text-center">Employee List</h2>
        }
    }


    return(
        <div className="container">
        <div className="card"> 
             {
                pageTitle()
             }
            <div className="card-body">

            <form>
            <div className="mb-6 col-auto">
             <label htmlFor="firstName" className="form-label">FirstName</label>
             <input type="text" className={`form-control ${errors.firstName? 'is-invalid':''}`} id="firstName" value={firstName} onChange={handleFirstName} autoComplete="firstName"/>
             {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
             </div>
             <div className="mb-6 col-auto">
             <label htmlFor="lastName" className="form-label">Last Name</label>
             <input type="text" className={`form-control ${errors.lastName? 'is-invalid':''}`} id="lastName" value={lastName} onChange={handleLastName} autoComplete="lastName"/>
             {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
             </div>
             <div className="mb-6 col-auto">
             <label htmlFor="title" className="form-label">Title</label>
             <input type="text" className={`form-control ${errors.title ? 'is-invalid': ''}`} id="title" value={title} onChange={handleTitle} autoComplete="title"/>
             {errors.title && <div className="invalid-feedback">{errors.title}</div>}
             </div>
              <div className="mb-6 col-auto">
             <label htmlFor="email" className="form-label">Email address</label>
             <input type="email" className={`form-control ${errors.email ? 'is-invalid':''}`} id="email" value={email} onChange={handleEmail} autoComplete="email"/>
             {errors.email && <div className="invalid-feedback">{errors.email}</div>}
             </div>
             <div className="mb-6 col-auto">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid':''}`} id="password"value={password} onChange={handlePassword} autoComplete="password"/>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
            </div>
        </div>
        </div>        
    );
}

export default AddEmployeeComponent;