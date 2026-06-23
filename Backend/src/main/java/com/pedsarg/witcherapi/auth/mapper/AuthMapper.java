package com.pedsarg.witcherapi.auth.mapper;

import com.pedsarg.witcherapi.auth.dto.request.RegisterRequestDTO;
import com.pedsarg.witcherapi.auth.dto.response.LoginResponseDTO;
import com.pedsarg.witcherapi.auth.dto.response.RegisterResponseDTO;
import com.pedsarg.witcherapi.model.User;

public class AuthMapper {

    public static LoginResponseDTO toLoginResponseDTO(User user){
        return new LoginResponseDTO(user.getId(), user.getUsername(), user.getFullname(), user.getEmail());
    }

    public static RegisterResponseDTO toRegisterResponseDTO(User user){
        return new RegisterResponseDTO(user.getId(), user.getUsername(), user.getFullname(), user.getEmail());
    }

    public static User toEntity(RegisterRequestDTO userDTO){
        User userEntity = new User();

        userEntity.setUsername(userDTO.getUsername());
        userEntity.setFullname(userDTO.getFullname());
        userEntity.setEmail(userDTO.getEmail());

        return userEntity;
    }

}
