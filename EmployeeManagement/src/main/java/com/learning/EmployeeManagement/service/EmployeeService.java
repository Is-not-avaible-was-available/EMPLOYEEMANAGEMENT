package com.learning.EmployeeManagement.service;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;

import com.learning.EmployeeManagement.dto.EmployeeResponse;
import com.learning.EmployeeManagement.exception.NotFoundException;
import com.learning.EmployeeManagement.exception.ResourceAlreadyExistsException;
import com.learning.EmployeeManagement.mapper.EmployeeMapper;
import com.learning.EmployeeManagement.model.Employee;
import com.learning.EmployeeManagement.repository.EmployeeRepository;

@Service
public class EmployeeService {
    
    private EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public EmployeeResponse createNewEmployee(String firstName, String lastName, String email, String password,
            String title) throws ResourceAlreadyExistsException {

                Optional<Employee> optionalEmployee = employeeRepository.findEmployeeByEmail(email);
                if(optionalEmployee.isPresent()){
                    throw new ResourceAlreadyExistsException("user already exists with this email");
                }
                String empCode =  RandomStringUtils.randomAlphanumeric(10);
                Employee newEmployee = new Employee(firstName, lastName, email, password, title, empCode);
                Employee savedEmployee = employeeRepository.save(newEmployee);

        return EmployeeMapper.mapEmployeeToResponse(savedEmployee);
    }

    public EmployeeResponse updateExistingEmployee(Long id, String firstName, String lastName, String email,
     String password, String title) throws NotFoundException {

                Optional<Employee> optionalEmployee = employeeRepository.findById(id);
                if(optionalEmployee.isEmpty()){
                    throw new NotFoundException("Employee not found with id:" +id);
                }
                Employee employee = optionalEmployee.get();
                if(firstName!=null){
                    employee.setFirstName(firstName);
                }

                if(lastName!=null){
                    employee.setLastName(lastName);
                }

                if(email!=null){
                    employee.setEmail(email);
                }

                if(password!=null){
                    employee.setPassword(password);
                }
                if(title!=null){
                    employee.setTitle(title);
                }

                Employee saved = employeeRepository.save(employee);
       return EmployeeMapper.mapEmployeeToResponse(saved);
    }

    public List<EmployeeResponse> getAllEmployees() {

        List<Employee> employees = employeeRepository.findAll();
        List<EmployeeResponse> employeeResponses = employees.stream()
                                    .map(employee -> EmployeeMapper.mapEmployeeToResponse(employee)).toList();

       return employeeResponses;
    }

    public EmployeeResponse findEmployeeById(Long id) throws NotFoundException {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isEmpty()){
           throw new NotFoundException("Employee not found with id:" +id);
        }

        Employee employee = optionalEmployee.get();
        return EmployeeMapper.mapEmployeeToResponse(employee);
    }

    public EmployeeResponse deleteEmployeeById(Long id) throws NotFoundException {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if(optionalEmployee.isEmpty()){
            throw new NotFoundException("Employee not found!");
        }

        Employee employee = optionalEmployee.get();
        EmployeeResponse employeeResponse = EmployeeMapper.mapEmployeeToResponse(employee); 
        employeeRepository.delete(employee);
        return employeeResponse;
    }


}
