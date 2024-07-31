package com.example.planner.controllers;

import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class GoogleCalendarController {

    private String redirectUri = "http://localhost:8080/oauth2Callback";
    private String calendarId = "primary";
    private GoogleAuthorizationCodeFlow flow;

    @Autowired
    public GoogleCalendarController(GoogleAuthorizationCodeFlow flow) {
        this.flow = flow;
    }

    @GetMapping("/calendar")
    public RedirectView authorizationGoogle() {
        return new RedirectView(
                flow.newAuthorizationUrl()
                    .setRedirectUri(redirectUri)
                    .build()
        );
    }

    @GetMapping("/oauth2Callback")
    public RedirectView oauth2Callback(@RequestParam String code) throws IOException {
        TokenResponse tokenResponse = flow.newTokenRequest(code)
                .setRedirectUri(redirectUri).execute();
        String accessToken = tokenResponse.getAccessToken();

        String redirectUrl = "http://localhost:4200/events?GoogleAuthToken=" + accessToken;
        return new RedirectView(redirectUrl);
    }


    @GetMapping("/events")
    public ResponseEntity<List<Event>> getCalendarEvents(@RequestHeader("Authorization") String authorizationHeader) throws GeneralSecurityException, IOException {
        String accessToken = authorizationHeader.replace("Bearer ", "");

        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);
        Calendar service = new Calendar.Builder(
                GoogleNetHttpTransport.newTrustedTransport(),
                JacksonFactory.getDefaultInstance(),
                credential
        ).build();

        Events events = service.events().list(calendarId)
                .setOrderBy("startTime")
                .setSingleEvents(true)
                .execute();

        List<Event> items = events.getItems();
        System.out.println("My: " + items);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

}
