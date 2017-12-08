package com.rhino.model;

/**
 * Created by user on 04/11/2017.
 */
public class UserTokenState {

    private String access_token;
    private Long expires_in;

    public UserTokenState() {
        this.access_token = null;
        this.expires_in = null;
    }

    public UserTokenState(String accessToken, long expiresIn) {
        this.access_token = accessToken;
        this.expires_in = expiresIn;
    }

    public String getAccess_token() {
        return access_token;
    }

    public void setAccess_token(String accessToken) {
        this.access_token = accessToken;
    }

    public Long getExpires_in() {
        return expires_in;
    }

    public void setExpires_in(Long expiresIn) {
        this.expires_in = expiresIn;
    }
}
