package com.rhino.web;

import com.rhino.model.User;
import com.rhino.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

/**
 * Created by user on 04/11/2017.
 */
@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private IUserService userService;

    @RequestMapping(method = RequestMethod.GET,value = "/user/{userId}")
    public User loadById(@PathVariable Long userId){
        return userService.findById(userId);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/findAll")
    public List<User> findAll(){
        return userService.findAll();
    }

    @RequestMapping("/whoami")
    public User whoAmI(Principal user){
        return userService.whoAmI(user.getName());
    }

}
