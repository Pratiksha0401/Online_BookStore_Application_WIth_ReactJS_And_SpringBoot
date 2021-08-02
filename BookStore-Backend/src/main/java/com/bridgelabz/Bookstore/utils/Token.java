package com.bridgelabz.Bookstore.utils;

import java.util.Date;
import java.util.UUID;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;

import com.bridgelabz.Bookstore.model.UserData;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class Token {
	
	SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
	public final String TOKEN_SECRET = "sd5745FAHFW";
	
	public String generateVerificationtoken(UserData userdata) {	
		long currentTime = System.currentTimeMillis();
//        System.out.println("generate token id:   " + userdata.getUserId());
        return Jwts.builder()
                .setId(String.valueOf(userdata.getUserId()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(currentTime +100000000))
                .signWith(signatureAlgorithm, TOKEN_SECRET)
                .compact();
	}
	
	public UUID decodeJWT(String jwt) throws JwtException {
        try {
            Claims claims = Jwts.parser().setSigningKey("sd5745FAHFW")
            		                     .parseClaimsJws(jwt)
            		                     .getBody();
//            System.out.println("jwt id: " + claims.getId());
            return UUID.fromString(claims.getId());
        } catch (ExpiredJwtException e) {
            throw new JwtException("Session time out");
        }
    }
}
