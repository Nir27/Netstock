package com.inventory.userservice.service;

import com.inventory.userservice.model.User;
import com.inventory.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl implements  UserService {

    @Autowired
    private UserRepository userRepository;

    public User addUser(User user){

        return userRepository.save(user);

    }

    public ResponseEntity<String> validateUser(String email, String password){

        User user = userRepository.findByEmail(email);

        if(user==null){

            return ResponseEntity.badRequest().body("Email is not correct");
        }
        if(user!=null && password.equals(user.getPassword())){

            return ResponseEntity.ok("Login successful. User ID : " + user.getUserId());

        }
        return ResponseEntity.badRequest().body("Login unsuccessful.");

    }

}
