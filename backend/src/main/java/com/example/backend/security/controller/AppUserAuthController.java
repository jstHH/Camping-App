package com.example.backend.security.controller;

import com.example.backend.security.model.AppUserDTO;
import com.example.backend.security.service.JWTUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AppUserAuthController {

    private final AuthenticationManager authenticationManager;
    public final JWTUtilService jwtUtilService;

    @Autowired
    public AppUserAuthController(AuthenticationManager authenticationManager, JWTUtilService jwtUtilService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtilService = jwtUtilService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AppUserDTO appUser) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getLogin(), appUser.getPassword()));
        return jwtUtilService.createToken(appUser.getLogin());
    }
}
