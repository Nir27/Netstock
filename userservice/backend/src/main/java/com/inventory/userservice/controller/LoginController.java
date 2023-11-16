package com.inventory.userservice.controller;

import com.inventory.userservice.dto.LoginRequest;
import com.inventory.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping
@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UserService userService;
    @PostMapping("/login")
    public ResponseEntity<String> login (@RequestBody LoginRequest loginRequest){

        try {
            String email = loginRequest.getEmail();
            String password = loginRequest.getPassword();

            System.out.println("Email: " + email);
            System.out.println("Password: " + password);

            return userService.validateUser(email,password);
        }
        catch (Exception e){

            return ResponseEntity.badRequest().body("Login unsuccessful.");
        }

    }
}
