package com.learning.EmployeeManagement.mapper;

import com.learning.EmployeeManagement.dto.EmployeeResponse;
import com.learning.EmployeeManagement.model.Employee;

public class EmployeeMapper {
    
    public static EmployeeResponse mapEmployeeToResponse(Employee employee){
        EmployeeResponse employeeResponse = new EmployeeResponse();
        employeeResponse.setFirstName(employee.getFirstName());
        employeeResponse.setLastName(employee.getLastName());
        employeeResponse.setEmail(employee.getEmail());
        employeeResponse.setPassword(employee.getPassword());
        employeeResponse.setId(employee.getId());
        employeeResponse.setTitle(employee.getTitle());
        employeeResponse.setEmployeeCode(employee.getEmployeeCode());
        return employeeResponse;
    }
}
