package com.bridgelabz.Bookstore.service;

import java.util.UUID;

public interface IOrdredService {

	String createOrder(String token);

	Long getOrderByToken(String token);

}
