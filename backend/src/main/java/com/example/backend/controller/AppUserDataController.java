package com.example.backend.controller;

import com.example.backend.security.model.AppUserDataDTO;
import com.example.backend.service.AppUserDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class AppUserDataController {

    private final AppUserDataService appUserDataService;


    public AppUserDataController(AppUserDataService appUserDataService) {
        this.appUserDataService = appUserDataService;
    }

    @GetMapping
    public List<AppUserDataDTO> getAllAppUsersData () {
        return appUserDataService.getAllUsersData();
    }

    @GetMapping("/current")
    public AppUserDataDTO getAppUserData (Principal principal) {
        return appUserDataService.getUserDataByLogin(principal.getName());
    }
}
