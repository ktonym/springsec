package com.rhino.service;

/**
 * Created by user on 03/12/2017.
 */
public interface IMailSenderService  {
    public void sendEmail(String recipient,String text, String subject) throws Exception;
}
