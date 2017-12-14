package com.rhino.service;

import com.rhino.TokenHelper;
import com.rhino.model.User;
import com.rhino.repo.UserRepository;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by user on 04/11/2017.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    protected final Log LOGGER = LogFactory.getLog(getClass());

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private TokenHelper tokenHelper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);
        User user = userRepository.findByUsername(username);
        if(user == null){
            throw new UsernameNotFoundException(String.format("No user found with username '%s'.",username));
        } else {
            return user;
        }
    }

    @PreAuthorize("hasRole('USER')")
    public void changePassword(String oldPassword,String newPassword){
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();

        if(authenticationManager!=null){
            LOGGER.debug("Re-authenticating user '"+ username +"' for password change request. ");
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username,oldPassword));
        } else {
            LOGGER.debug("No authentication manager set. Can't change password!");
            return;
        }

        LOGGER.debug("Changing password for user '" + username + "'");
        User user = (User) loadUserByUsername(username);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
