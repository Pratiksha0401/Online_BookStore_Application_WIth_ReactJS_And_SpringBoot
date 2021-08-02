package com.bridgelabz.Bookstore.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.Bookstore.dto.OrderAddressDto;
import com.bridgelabz.Bookstore.exception.UserDataException;
import com.bridgelabz.Bookstore.model.OrderAddress;
import com.bridgelabz.Bookstore.model.OrderPlaced;
import com.bridgelabz.Bookstore.model.UserData;
import com.bridgelabz.Bookstore.repository.OrderPlacedRepo;
//import com.bridgelabz.Bookstore.repository.OrderPlacedRepo;
import com.bridgelabz.Bookstore.repository.UserDataRepository;
import com.bridgelabz.Bookstore.utils.Token;

@Service
public class OrderPlacedService implements IOrdredService {

	@Autowired
	OrderPlacedRepo orderRepo;

	@Autowired
	private UserDataRepository userDataRepo;

	@Autowired
	Token jwtToken;

	public UserData isUserPresent(String token) {
		UUID userId = jwtToken.decodeJWT(token);
		Optional<UserData> userDetailsById = userDataRepo.findById(userId);

		if (!userDetailsById.isPresent()) {
			throw new UserDataException("User Not Found");
		}
		return userDetailsById.get();
	}

	@Override
	public String createOrder(String token) {
		UserData userData = isUserPresent(token);
//	        List<CartDetails> cartDetailsList = userData.getCartDetailsList();
//	        PlacedOrder placedOrder = new PlacedOrder(placedOrderDTO,cartDetailsList);
		OrderPlaced placedOrder = new OrderPlaced();
//	        System.out.println("Cart Detail:- " + cartDetailsList);
//	        placedOrder.setCartDetailsList(userData.getCartDetailsList());
//	        System.out.println("User Data:- " + userData);
//	        userData.addOrders(placedOrder);
		orderRepo.save(placedOrder);
		return "Order Added Successfully.";
	}

	@Override
	public Long getOrderByToken(String token) {
		UserData userData = isUserPresent(token);
		OrderPlaced placedOrder = new OrderPlaced(LocalDateTime.now());
//	        placedOrderList.stream().filter(placedOrder -> LocalDateTime.now() < placedOrder.getCreatedAt()).;
		orderRepo.save(placedOrder);
		return orderRepo.count()+10000;
	}

}
