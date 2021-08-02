package com.bridgelabz.Bookstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bridgelabz.Bookstore.model.OtpModel;

public interface OtpModelRepo extends JpaRepository<OtpModel, Long> {

	OtpModel findByToken(String token);

}
