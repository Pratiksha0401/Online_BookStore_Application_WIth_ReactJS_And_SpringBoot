package com.bridgelabz.Bookstore.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.Bookstore.dto.OrderAddressDto;
import com.bridgelabz.Bookstore.dto.ResponseDTO;
import com.bridgelabz.Bookstore.model.OrderAddress;
import com.bridgelabz.Bookstore.service.IOrderAddressService;


@RestController
@CrossOrigin
public class OrderAddressController {
	
	@Autowired
	private IOrderAddressService orderAddressService;

	@GetMapping("/getAddress")
	public ResponseEntity<ResponseDTO> getAddress(@RequestHeader(value = "token") String token)
	{
		List<OrderAddress> userAddress = orderAddressService.getAddress(token);
		ResponseDTO responseDTO = new ResponseDTO("Response Successful", userAddress);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}
	
	@PostMapping("/set/{cartId}/")
	public ResponseEntity<ResponseDTO> setAddress(@RequestHeader(value = "token") String token,
			@RequestBody OrderAddressDto orderAddressDto , @PathVariable("cartId") UUID cartId ) {

		String cartData = orderAddressService.addAddress(token, orderAddressDto ,cartId);

		ResponseDTO responseDTO = new ResponseDTO("Response Successful", cartData);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}
	
	@PostMapping("/addAddress")
	public ResponseEntity<ResponseDTO> addAddress(@RequestHeader(value = "token") String token,
			@RequestBody OrderAddressDto orderAddressDto) {

		String cartData = orderAddressService.addAddressDetails(token, orderAddressDto );

		ResponseDTO responseDTO = new ResponseDTO("Response Successful", cartData);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}
	
//	@PostMapping("/delete/{addressId}/")
//	public ResponseEntity<ResponseDTO> deleteAddress(@RequestHeader(value = "token") String token,
//			@PathVariable("addressId") UUID addressId ) {
//
//		String cartData = orderAddressService.deleteAddress(token,addressId);
//
//		ResponseDTO responseDTO = new ResponseDTO("Response Successful", cartData);
//		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
//	}
//	
//	@PutMapping("/update/{addressId}/")
//	public ResponseEntity<ResponseDTO> updateAddress(@RequestHeader(value = "token") String token,
//			@PathVariable("addressId") UUID addressId ,@RequestBody OrderAddressDto orderAddressDto) {
//
//		String cartData = orderAddressService.updateAddress(token,addressId,orderAddressDto);
//
//		ResponseDTO responseDTO = new ResponseDTO("Response Successful", cartData);
//		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
//	}
	
}
