package com.example.planner.controllers;

import com.example.planner.security.JwtResponse;
import com.example.planner.security.ResponseMessage;
import com.example.planner.security.JwtProvider;
import com.example.planner.security.LoginForm;
import com.example.planner.security.SignUpForm;
import com.example.planner.repository.UserRepository;
import com.example.planner.model.Role;
import com.example.planner.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/auth")
public class AuthController {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private JwtProvider jwtProvider;
    private DaoAuthenticationProvider daoAuthenticationProvider;

    @Autowired
    public AuthController(UserRepository userRepository, PasswordEncoder passwordEncoder, DaoAuthenticationProvider daoAuthenticationProvider, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.daoAuthenticationProvider = daoAuthenticationProvider;
        this.jwtProvider = jwtProvider;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> register(@RequestBody SignUpForm signUpForm) {
        if (userRepository.existsByUsername(signUpForm.getUsername())) {
            return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken."), HttpStatus.BAD_REQUEST);
        }

        User user = new User(signUpForm.getUsername(), passwordEncoder.encode(signUpForm.getPassword()));

        user.setRole(Role.USER);

        userRepository.save(user);
        return new ResponseEntity<>(new ResponseMessage("User registered successfully."), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm) {

        Authentication authentication = daoAuthenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtProvider.generateJwtToken(authentication); //(user)
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(jwt,userDetails.getUsername()));
    }
}
