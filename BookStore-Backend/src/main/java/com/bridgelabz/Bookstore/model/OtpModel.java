package com.bridgelabz.Bookstore.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "otp_generator")
public class OtpModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	private long otp;
	private String token;

	public OtpModel(long otp, String token) {
		this.otp = otp;
		this.token = token;
	}
}
