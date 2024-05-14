package com.learning.EmployeeManagement.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.learning.EmployeeManagement.model.Employee;


public interface EmployeeRepository extends JpaRepository<Employee, Long>{
    Optional<Employee> findEmployeeByEmail(String email);
}
