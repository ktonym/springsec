package com.rhino.model;

import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 * Created by user on 12/11/2017.
 */
public interface JsonItem {

    public JsonObject toJson();
    public void addJson(JsonObjectBuilder builder);

}
