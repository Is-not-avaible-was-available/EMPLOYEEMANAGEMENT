import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/employees"

export const EmployeeList = () =>{

    return axios.get(REST_API_BASE_URL);
}

export const addEmployee = (employee) => {
    return axios.post(REST_API_BASE_URL, employee);
}