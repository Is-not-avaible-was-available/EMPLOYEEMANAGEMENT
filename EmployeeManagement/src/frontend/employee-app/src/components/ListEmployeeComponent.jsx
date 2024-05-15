import React, { useEffect, useState } from "react";
import { EmployeeList, deleteEmployee } from "../services/employeeService";
import { useNavigate } from "react-router-dom";


const ListEmployeeComponent = () =>{
    const[employees, setEmployees] = useState([]);

    const navigate = useNavigate();
   

    useEffect(()=>{
       getAllEmployees();
    },[]);

    function getAllEmployees(){
        EmployeeList().then((response)=>{
            setEmployees(response.data)
        }).catch(error =>{
            console.error(error);
        })
    }

    function updateEmployee(id){
        navigate(`/edit-employee/${id}`);
    }

    function removeEmployee(id){
        deleteEmployee(id).then((response)=>{
            getAllEmployees();
        }).catch(error=>{
            console.error(error);
        })
    }

    function handleOnClick(e){
       navigate("/add-employee")
    }
    return (
    <div className="container">
        <h2 className="text-center">Employee List</h2>
        <button type="button" className="btn btn-outline-primary" onClick={handleOnClick}>Add New Employee</button>
        <table className="table table-primary table-hover">
            <thead>
                <tr className="table-dark">
                    <th scope="col">Id</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Title</th>
                    <th scope="col">Employee Code</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((employee) => (
                        <tr key={employee.id} className="">
                            <th  scope="row">{employee.id}</th>
                            <td >{employee.firstName}</td>
                            <td >{employee.lastName}</td>
                            <td >{employee.email}</td>
                            <td >{employee.title}</td>
                            <td >{employee.employeeCode}</td>
                            <td>
                                <button className="btn btn-primary" onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className="btn btn-danger" onClick={()=>removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
    );
};

export default ListEmployeeComponent;