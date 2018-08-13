package com.transaction.backend.service;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EMailSender {

    private static final Logger LOG = LoggerFactory.getLogger(EMailSender.class);

    private JavaMailSender mailSender;


    @Value("${app.email.sending-enabled}")
    private boolean sendingEnabled;

    @Autowired
    public EMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }


    public void sendMail(String to, String subject, String content) {
        validateSendingParams(to, subject, content);

        LOG.debug(String.format("Sending email to %s, with subject %s and content %s", to, subject, content));

        if (!sendingEnabled) {
            LOG.debug("Sending functionality is disabled, skipping...");
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content);

            mailSender.send(message);
        } catch (MessagingException ex) {
            LOG.error("Failed to send email");
        }
    }

    private void validateSendingParams(String to, String subject, String content) {
        if (to == null || to.isEmpty() ||
                subject == null || subject.isEmpty() ||
                content == null || content.isEmpty()) {
            LOG.error("missing email parameter");
            throw new IllegalArgumentException();
        }
    }
}
