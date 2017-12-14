package com.rhino.service;

import com.rhino.model.User;
import org.springframework.mobile.device.Device;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.nio.file.AccessDeniedException;
import java.util.List;

/**
 * Created by user on 04/11/2017.
 */
public interface IUserService {

    @PreAuthorize("hasRole('ADMIN')")
    User findById(Long id); // throws AccessDeniedException;
    User findByUsername(String username); // throws UsernameNotFoundException;
    @PreAuthorize("hasRole('ADMIN')")
    List<User> findAll(); // throws AccessDeniedException;
    @PreAuthorize("isAuthenticated()")
    User whoAmI(String username);
    Boolean changePassword(String token,String password);
    Boolean setPasswordResetToken(Long id,String token);
    Boolean resetPasswordRequest(String email,Device device);
}
