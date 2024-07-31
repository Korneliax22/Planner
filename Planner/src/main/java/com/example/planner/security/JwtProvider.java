package com.example.planner.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtProvider {

    private long jwtExpiration = 3600;
    private String jwtSecret = "DyL+8kYWMpcXPhsHAGa+BiNjzUPV1l2HD7JWbCcD4qn1uWFg2OhctxgKQzFTl5JyWlLqdsx7YWhGBCG6V4vfMA==";


    public String getUserNameFromJwtToken(String jwtToken) {
        return Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseSignedClaims(jwtToken)
                .getPayload() //getBody()
                .getSubject();
    }

    public boolean validateToken(String jwtToken) {
        try {
            Jwts.parser()
                .setSigningKey(jwtSecret)
                .build().parseSignedClaims(jwtToken);
            return true;
        }
        catch (MalformedJwtException e) {
            System.out.println("Invalid JWT token -> Message: {}" + e);
        } catch (ExpiredJwtException e) {
            System.out.println("Expired JWT token -> Message: {}" + e);
        } catch (UnsupportedJwtException e) {
            System.out.println("Unsupported JWT token -> Message: {}" + e);
        }

        return false;
    }

    public String generateJwtToken(Authentication authentication) {
        return Jwts.builder()
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(new Date((new Date()).getTime() + jwtExpiration*1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }
}
