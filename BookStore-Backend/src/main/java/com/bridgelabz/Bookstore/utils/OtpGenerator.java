package com.bridgelabz.Bookstore.utils;

public class OtpGenerator {
	public long otpGenerater() {
		return Math.round(Math.random() * 100000);
	}
}
