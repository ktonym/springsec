package com.rhino.model;

/**
 * Created by user on 04/12/2017.
 */
public class JsonErrorState {

    private String global;

    public JsonErrorState() {
        this.global = null;
    }

    public JsonErrorState(String global) {
        this.global = global;
    }

    public String getGlobal() {
        return global;
    }

    public void setGlobal(String global) {
        this.global = global;
    }
}
