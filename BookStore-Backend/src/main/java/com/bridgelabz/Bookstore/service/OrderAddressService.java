package com.bridgelabz.Bookstore.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.Bookstore.dto.OrderAddressDto;
import com.bridgelabz.Bookstore.exception.UserDataException;
import com.bridgelabz.Bookstore.model.CartDetails;
import com.bridgelabz.Bookstore.model.OrderAddress;
import com.bridgelabz.Bookstore.model.UserData;
import com.bridgelabz.Bookstore.repository.CartDetailsRepository;
import com.bridgelabz.Bookstore.repository.OrderAddressRepository;
import com.bridgelabz.Bookstore.repository.UserDataRepository;
import com.bridgelabz.Bookstore.utils.Token;

@Service
public class OrderAddressService implements IOrderAddressService {

	@Autowired
	private Token jwtToken;

	@Autowired
	private UserDataRepository userDataRepo;

	@Autowired
	private OrderAddressRepository orderAddressRepo;

	@Autowired
	private CartDetailsRepository cartDetailsRepository;

	public UserData isUserPresent(String token) {
		UUID userId = jwtToken.decodeJWT(token);
		Optional<UserData> userDetailsById = userDataRepo.findById(userId);

		if (!userDetailsById.isPresent()) {
			throw new UserDataException("User Not Found");
		}
		return userDetailsById.get();
	}

	public OrderAddressService() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public List<OrderAddress> getAddress(String token) {
		UserData userData = isUserPresent(token);
		UUID userId = userData.getUserId();
        
		return orderAddressRepo.findAll();
	}

	@Override
	public String addAddress(String token, OrderAddressDto orderAddressDto, UUID cartId) {
		UserData userData = isUserPresent(token);
		UUID userId = userData.getUserId();

		CartDetails cartData = cartDetailsRepository.findByCartId(cartId);
		OrderAddress orderAddress = new OrderAddress(orderAddressDto, cartData);

		orderAddressRepo.save(orderAddress);
		
		return "Success";
	}

	@Override
	public String addAddressDetails(String token, OrderAddressDto orderAddressDto) {
		UserData userData = isUserPresent(token);
		OrderAddress orderAddress=new OrderAddress(orderAddressDto);
		OrderAddress saveAddress=orderAddressRepo.save(orderAddress);	
		return "Address Added Sucessfully";
	}

//	@Override
//	public String deleteAddress(String token, UUID addressId) {
//		UserData userData = isUserPresent(token);
//		UUID userId = userData.getUserId();
//		orderAddressRepo.deleteById(addressId);
//		return "Address Deleted sucessfully";
//	}

//	@Override
//	public String updateAddress(String token, UUID addressId, OrderAddressDto orderAddressDto) {
//		UserData userData = isUserPresent(token);
//		UUID userId = userData.getUserId();
//		Optional<OrderAddress> orderAddress= orderAddressRepo.findById(addressId);
//		OrderAddress newOrderAddress = orderAddress.get();
//		newOrderAddress.setAddress(orderAddressDto.getAddress());
//		newOrderAddress.setCity(orderAddressDto.getCity());
//		newOrderAddress.setFullName(orderAddressDto.getFullName());
//		newOrderAddress.setMobNo(orderAddressDto.getMobNo());
//		newOrderAddress.setState(orderAddressDto.getState());
//		orderAddressRepo.save(newOrderAddress);
//		return "Address Updated Succesfully";
//	}

}
