package com.pedsarg.witcherapi.auth.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pedsarg.witcherapi.auth.dto.request.LoginRequestDTO;
import com.pedsarg.witcherapi.auth.dto.request.RegisterRequestDTO;
import com.pedsarg.witcherapi.auth.dto.response.LoginResponseDTO;
import com.pedsarg.witcherapi.auth.dto.response.RegisterResponseDTO;
import com.pedsarg.witcherapi.auth.exceptions.InvalidCredentialsException;
import com.pedsarg.witcherapi.auth.exceptions.UserAlreadyExistsException;
import com.pedsarg.witcherapi.model.User;
import com.pedsarg.witcherapi.auth.mapper.AuthMapper;
import com.pedsarg.witcherapi.auth.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthService(UserRepository repository, BCryptPasswordEncoder passwordEncoder){
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }
       
    public LoginResponseDTO login(LoginRequestDTO loginUserDTO){

        User user = repository.findByUsername(loginUserDTO.getUsername()).orElseThrow(() -> new InvalidCredentialsException("Invalid username or password."));

        if (!passwordEncoder.matches(loginUserDTO.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid username or password.");
        }

        return AuthMapper.toLoginResponseDTO(user);
    }

    public RegisterResponseDTO register(RegisterRequestDTO registerUserDTO){

        List<String> errors = new ArrayList<>();

        if(repository.existsByUsername(registerUserDTO.getUsername())) {
            errors.add("Username already exists!");
        }

        if(repository.existsByEmail(registerUserDTO.getEmail())) {
            errors.add("Email already exists!");
        }

        if(!errors.isEmpty()) {
            throw new UserAlreadyExistsException(
                String.join(" ", errors)
            );
        }

        User newUser = AuthMapper.toEntity(registerUserDTO);

        newUser.setPasswordHash(passwordEncoder.encode(registerUserDTO.getPassword()));

        return AuthMapper.toRegisterResponseDTO(repository.save(newUser));
    }
}
