package com.bridgelabz.Bookstore.service;

import java.util.List;
import java.util.UUID;

import com.bridgelabz.Bookstore.dto.CartDetailsDto;
import com.bridgelabz.Bookstore.model.CartDetails;

public interface ICartDetails {
	
	List<CartDetails> getAllCarts(String Token);
	
	String addBookToCart(String Token, CartDetailsDto cartDto, UUID bookId);

	String updateCart(String token, UUID cartId, Long quantity);

	String deleteCart(String token, UUID cartId);

	String updateStatus(String token, UUID cartId, String status);
}
