package com.rhino.auth;

import com.rhino.model.User;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Created by user on 03/11/2017.
 */
public class TokenBasedAuthentication extends AbstractAuthenticationToken {

    private String token;
    private final UserDetails principal;
    //private User principal;

    public TokenBasedAuthentication(UserDetails principal) {
        super(principal.getAuthorities());
        this.principal = principal;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }
}
