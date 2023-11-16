package com.inventory.userservice.service;


import com.inventory.userservice.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    public User addUser(User user);
    public ResponseEntity<String> validateUser(String email,String password);
}
