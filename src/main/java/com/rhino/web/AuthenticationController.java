package com.rhino.web;

import com.rhino.TokenHelper;
import com.rhino.auth.JwtAuthenticationRequest;
import com.rhino.common.DeviceProvider;
import com.rhino.model.JsonErrorState;
import com.rhino.model.User;
import com.rhino.model.UserTokenState;
import com.rhino.service.CustomUserDetailsService;
import com.rhino.service.IMailSenderService;
import com.rhino.service.IUserService;
import com.rhino.service.MailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.json.JsonObject;
import javax.naming.AuthenticationException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
import static sun.audio.AudioDevice.device;

/**
 * Created by user on 04/11/2017.
 */
@RestController
@RequestMapping(value = "/auth", produces = APPLICATION_JSON_VALUE)
public class AuthenticationController extends AbstractHandler{

    @Autowired
    TokenHelper tokenHelper;

    @Autowired
    private AuthenticationManager authenticationManager;

    /*@Autowired
    private CustomUserDetailsService userDetailsService;*/

    @Autowired
    private DeviceProvider deviceProvider;

    /*@Autowired
    private IMailSenderService mailSender;*/

    @Autowired
    private IUserService userService;

    @PostMapping(value = "/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest,
                                                       HttpServletResponse response, Device device
    ) throws AuthenticationException, IOException{

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(//username,password)
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword())
        );

        // Inject into security context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // token creation
        User user = (User)authentication.getPrincipal();
        String jws = tokenHelper.generateToken( user.getUsername(), device);
        int expiresIn = tokenHelper.getExpiredIn(device);
        String email = user.getEmail();

        // Return the token
        //return ResponseEntity.ok(new UserTokenState(jws, expiresIn));

        Map<String,Object> result = new HashMap<>();
        result.put("user",new UserTokenState(jws,expiresIn,email));
        /*try {
            mailSender.sendEmail("ktonym@gmail.com","Hi there!!","Testing");
        } catch (Exception e) {
            e.printStackTrace();
        }*/
        return ResponseEntity.accepted().body(result);

    }

    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refreshAuthenticationToken(HttpServletRequest request,
                                                        //HttpServletResponse response,
                                                        Principal principal){

        String authToken = tokenHelper.getToken(request);
        Device device = deviceProvider.getCurrentDevice(request);

        if(authToken != null && principal != null){
            User user = (User) principal;
            //TODO check user password last update
            String refreshedToken = tokenHelper.refreshToken(authToken,device);
            int expiresIn = tokenHelper.getExpiredIn(device);
            return ResponseEntity.ok(new UserTokenState(refreshedToken,expiresIn,user.getEmail()));
        } else {
            UserTokenState userTokenState = new UserTokenState();
            return ResponseEntity.accepted().body(userTokenState);
        }
    }

    @PostMapping(value = "/change_password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger){

        userService.changePassword(passwordChanger.token,passwordChanger.newPassword);

        Map<String,Object> result = new HashMap<>();
        result.put("success",true);
        return ResponseEntity.accepted().body(result);
    }

    static class PasswordChanger {
        public String token;
        public String newPassword;
    }

    @PostMapping(value = "/reset_password_request")
    public ResponseEntity<?> resetPasswordRequest(@RequestBody EmailRequest emailRequest,
                                                  Device device){

        //JsonObject jsonObject = parseJsonObject(email);
        /*System.out.println("Web method email ");
        System.out.println(emailRequest.email);*/
        Map<String,Object> result = new HashMap<>();
        if (userService.resetPasswordRequest(emailRequest.email,device)){
            result.put("success", true);
            return ResponseEntity.accepted().body(result);
        }
        result.put("success", false);
        JsonErrorState jsonErrorState = new JsonErrorState("Something went wrong");
//        result.put("msg", "Something went wrong");
        result.put("errors", jsonErrorState);
        return ResponseEntity.status(400).body(result);
    }

    static class EmailRequest {
        public String email;
    }

    @PostMapping(value = "/validate_token")
    public ResponseEntity<?> validateToken(@RequestBody TokenRequest request, Device device){
        Map<String,Object> result = new HashMap<>();
        result.put("result", true);
        //System.out.println(request.token);
        if(tokenHelper.validateToken(request.token)){
            return ResponseEntity.ok(result);
        } else {
            JsonErrorState jsonErrorState = new JsonErrorState("Something went wrong");
            return ResponseEntity.status(401).body(jsonErrorState);
        }

    }

    static class TokenRequest {
        public String token;
    }
}
