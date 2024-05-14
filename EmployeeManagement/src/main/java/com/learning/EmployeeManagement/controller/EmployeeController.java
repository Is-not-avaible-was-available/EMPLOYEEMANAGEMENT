package com.learning.EmployeeManagement.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.learning.EmployeeManagement.dto.CreateEmployeeDTO;
import com.learning.EmployeeManagement.dto.EmployeeResponse;
import com.learning.EmployeeManagement.exception.NotFoundException;
import com.learning.EmployeeManagement.exception.ResourceAlreadyExistsException;
import com.learning.EmployeeManagement.service.EmployeeService;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeeController {

    private EmployeeService employeeService;
    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }
    
    @PostMapping()
    public ResponseEntity<EmployeeResponse> createNewEmployee(@RequestBody CreateEmployeeDTO employeeDto) throws ResourceAlreadyExistsException{
        EmployeeResponse employeeResponse = employeeService.createNewEmployee(employeeDto.getFirstName(), 
        employeeDto.getLastName(), employeeDto.getEmail(), employeeDto.getPassword(), employeeDto.getTitle());

        return new ResponseEntity<>(employeeResponse, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponse> updateEmployeeDetails(@PathVariable Long id,
    @RequestBody CreateEmployeeDTO employeeDTO) throws NotFoundException{
        EmployeeResponse employeeResponse = employeeService.updateExistingEmployee(id, employeeDTO.getFirstName(),
        employeeDTO.getLastName(), employeeDTO.getEmail(), employeeDTO.getPassword(), employeeDTO.getTitle());

        return new ResponseEntity<>(employeeResponse, HttpStatus.OK);
    }
    
    @GetMapping()
    public ResponseEntity<List<EmployeeResponse>> getAllEmployee(){
        List<EmployeeResponse> employeeResponses = employeeService.getAllEmployees();

        return new ResponseEntity<>(employeeResponses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable Long id) throws NotFoundException{
        EmployeeResponse employeeResponse = employeeService.findEmployeeById(id);
        return new ResponseEntity<>(employeeResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<EmployeeResponse> deleteEmployeeById(@PathVariable Long id) throws NotFoundException{
        EmployeeResponse employeeResponse = employeeService.deleteEmployeeById(id);
        return new ResponseEntity<>(employeeResponse, HttpStatus.OK);
    }
}
