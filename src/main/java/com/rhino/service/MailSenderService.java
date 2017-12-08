package com.rhino.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

/**
 * Created by user on 03/12/2017.
 */
@Service("mailSenderService")
public class MailSenderService implements IMailSenderService{
    @Autowired
    private JavaMailSender sender;

    @Override
    public void sendEmail(String recipient,String text, String subject) throws Exception{
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message,true);
        helper.setTo(recipient);
        helper.setText(text);
        helper.setSubject(subject);
        sender.send(message);
    }
}
