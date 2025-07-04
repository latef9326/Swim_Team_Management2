package com.example.swim_team_management2.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET = "BskN2K9vGpLZbdL2eXlGlI5QsML0Zp4Z8eUgN3RzNjNGej4l8vGkVv2KlZAnJGML1qpB1y5R+AU=BskN2K9vGpLZbdL2eXlGlI5QsML0Zp4Z8eUgN3RzNjNGej4l8vGkVv2KlZAnJGML1qpB1y5R+AU=";
    private final long EXPIRATION_TIME = 86400000; // 1 dzień

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
    // Dodaj te metody do klasy JwtUtil
    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }
}
