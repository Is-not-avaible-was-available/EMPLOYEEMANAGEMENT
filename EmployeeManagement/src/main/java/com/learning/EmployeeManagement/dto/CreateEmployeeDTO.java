package com.learning.EmployeeManagement.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Getter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateEmployeeDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String title;
}
