package com.inventory.userservice.controller;


import com.inventory.userservice.dto.LoginRequest;
import com.inventory.userservice.model.User;
import com.inventory.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("user")
@RestController
@CrossOrigin(origins = "*")

public class UserController {

   @Autowired
   private UserService userService;

    @PostMapping
    public String addUser (@RequestBody User user){

        System.out.println("Request received at user");
        if(user.getEmail()==null){

            return ("email is not provided.");
        }

        if(user.getPassword()==null){

            return ("password is not provided.");
        }

        if(user.getFirstName()==null || user.getLastName() ==null){

            return ("first name or last name is not provided.");
        }
         User user1 = userService.addUser(user);
        return ("user is added.");

    }

}
