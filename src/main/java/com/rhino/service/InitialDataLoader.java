package com.rhino.service;

import com.rhino.model.Authority;
import com.rhino.model.Client;
import com.rhino.model.User;
import com.rhino.repo.AuthorityRepository;
import com.rhino.repo.ClientRepo;
import com.rhino.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

/**
 * Created by user on 04/11/2017.
 */
@Component
public class InitialDataLoader implements ApplicationListener<ContextRefreshedEvent>{

    boolean alreadySetup = false;

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AuthorityRepository authorityRepo;

    @Autowired
    private ClientRepo clientRepo;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        if(alreadySetup) return;

        User admin = createUserIfNotFound("admin");
        Authority role_admin = createAuthorityIfNotFound("ROLE_ADMIN");
        Authority role_user = createAuthorityIfNotFound("ROLE_USER");
        addUserIfNotInRole(admin,role_admin);
        addUserIfNotInRole(admin,role_user);

        Client client1 = new Client();
        client1.setJoinDate(LocalDate.now());
        client1.setClientName("Test Client 1");
        client1.setPin("A006008976G");
        clientRepo.save(client1);

        Client client2 = new Client();
        client2.setJoinDate(LocalDate.now());
        client2.setClientName("Test Client 2");
        client2.setPin("P088989805K");
        clientRepo.save(client2);
    }

    @Transactional
    private User createUserIfNotFound(String username) {
        User user = userRepo.findByUsername(username);
        if(user==null){
            user = new User();
            user.setPassword("123");
            user.setUsername(username);
            user.setEmail("ktonym@gmail.com");
            user.setFirstName("admin");
            user.setLastName("admin");
            user.setEnabled(true);
            user.setPhoneNumber("0725766814");
            userRepo.save(user);
        }
        return user;
    }

    @Transactional
    private Authority createAuthorityIfNotFound(String name) {
        Authority auth = authorityRepo.findByName(name);
        if(auth==null){
            auth = new Authority();
            auth.setName(name);
            authorityRepo.save(auth);
        }
        return auth;
    }

    @Transactional
    private void addUserIfNotInRole(User user,Authority authority){

        List<Authority> userAuths = authorityRepo.findAuthoritiesByUsersIn(user);

        if(userAuths.contains(authority)){
        }else {
            userAuths.add(authority);
            user.setAuthorities(userAuths);
            userRepo.save(user);
        }

    }
}
