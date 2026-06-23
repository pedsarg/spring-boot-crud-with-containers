package com.pedsarg.witcherapi.auth.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pedsarg.witcherapi.auth.dto.request.LoginRequestDTO;
import com.pedsarg.witcherapi.auth.dto.request.RegisterRequestDTO;
import com.pedsarg.witcherapi.auth.dto.response.LoginResponseDTO;
import com.pedsarg.witcherapi.auth.dto.response.RegisterResponseDTO;
import com.pedsarg.witcherapi.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service){
        this.service = service;
    }

    @PostMapping(value="/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public LoginResponseDTO login(@RequestBody LoginRequestDTO request) {
        return service.login(request);
    }

    @PostMapping(value = "/register",consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public RegisterResponseDTO register(@RequestBody RegisterRequestDTO request) {     
        return service.register(request);
    }
}
