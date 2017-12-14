package com.rhino.service;

import com.rhino.TokenHelper;
import com.rhino.model.User;
import com.rhino.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mobile.device.Device;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Optional;

/**
 * Created by user on 04/11/2017.
 */
@Service
@Transactional
public class UserService implements IUserService {


    @Autowired
    private UserRepository repo;
    @Autowired
    private TokenHelper tokenHelper;
    @Autowired
    private MailSenderService mailSender;

    @Override
    @Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
    public User findById(Long id){
        User user = repo.findOne(id);
        if(user!=null) return user;
        return null;
    }

    @Override
    @Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
    public User findByUsername(String username) {
        User user = repo.findByUsername(username);
        return user;
    }

    @Override
    @Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
    public List<User> findAll() {
        List<User> users = repo.findAll();
        return users;
    }

    @Override
    @Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
    public User whoAmI(String username) {
        User user = repo.findByUsername(username);
        return user;
    }

    @Override
    @Transactional(readOnly = false,propagation = Propagation.REQUIRED)
    public Boolean changePassword(String token, String password) {

        if(token.trim().isEmpty() || token == null || password.trim().isEmpty() || password == null){
            return false;
        }

        String username = tokenHelper.getUsernameFromToken(token);
        System.out.println("Username from token: " + username);
        User user = repo.findUserByUsernameAndPasswordResetToken(username,token);
        if(user==null){
            return false;
        } else {
            user.setPassword(password);
            repo.save(user);
            return true;
        }
    }

    @Override
    @Transactional(readOnly = false,propagation = Propagation.REQUIRED)
    public Boolean setPasswordResetToken(Long id, String token) {

        if(token == null || id<=0 || token.trim().isEmpty()){
            return false;
        }

        User user = repo.findOne(id);
        if(user==null){
            return false;
        } else {
            user.setPasswordResetToken(token);
            repo.save(user);
            return true;
        }
    }

    @Override
    @Transactional(readOnly = false, propagation = Propagation.REQUIRED)
    public Boolean resetPasswordRequest(String email, Device device) {

        if(email == null|| email.trim().isEmpty()){
            return false;
        } else {
            User user = repo.findByEmail(email);
            if(user==null) return false;
            String token = tokenHelper.generateTimeToken(user.getUsername(),device,3600);
            String path = "http://localhost:3000/reset_password/" + token;
            /*StringBuilder builder = new StringBuilder("<html><body>");
            builder.append("<p>Hi ").append("<bold>").append(user.getFirstName()).append("</bold>,</p><br/>")
                    .append("<p> You have requested for a password reset. Please click on the link below to reset your password.</p><br/>")
                    .append("<p> If this wasn't you, please ignore this email. The link expires in 24 hours.</p>")
                    .append("<a href=\""+path+"\">" + path + "</a>")
                    .append( "</body></html>");*/
            StringBuilder builder = new StringBuilder("Hi "+user.getFirstName()+", \n");
                builder.append("You have requested for a password reset. Please click on the link below to reset your password. \n")
                        .append("If this wasn't you, please ignore this email. The link expires in 24 hours.\n\n")
                        .append(path);
            String htmlText = builder.toString();
            try {
                mailSender.sendEmail("ktonym@gmail.com",htmlText,"Password reset confirmation");
                user.setPasswordResetToken(token);
                repo.save(user);
            } catch (Exception e) {
                e.printStackTrace();
            }
            return true;
        }
    }
}
