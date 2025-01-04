package org.example.futureengineers.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.Map;

@Service
public class HtmlEmailUtil {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private SpringTemplateEngine templateEngine;

    private static String subject = "Condidature pour passer un test d'orientation universitaire";
    private static String templateName = "email-template.html";
    private static String urlBase = "http://localhost:3000/pass-test?token=";

    public  void sendHtmlEmail(String to, Map<String, Object> variables) throws MessagingException {
        // Create email context with dynamic attributes
        Context context = new Context();
        String linkWithToken = urlBase.concat(variables.get("link").toString());
        variables.put("link", linkWithToken);
        context.setVariables(variables);

        // Process the template to generate HTML content
        String htmlContent = templateEngine.process(templateName, context);

        // Create the email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true); // Set true for HTML

        // Send the email
        System.out.println("Email envoyé au student avec le mail : " + variables.get("studentEmail"));
        mailSender.send(mimeMessage);
    }
}
