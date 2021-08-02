package com.bridgelabz.Bookstore.controllers;

import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.Bookstore.dto.ResponseDTO;
import com.bridgelabz.Bookstore.service.IOrdredService;

@RestController
@CrossOrigin
@RequestMapping("/orderPlaced")
public class OrderPlacedController {

	@Autowired
	private IOrdredService orderService;

	@PostMapping("/order")
	ResponseEntity<ResponseDTO> createOrderId(@RequestHeader(value = "tokenId") String tokenId) {
		String placedOrder = orderService.createOrder(tokenId);
		ResponseDTO responseDTO = new ResponseDTO("OrderAdded SuccessFully", placedOrder);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}

	@GetMapping("/getOrderId")
	ResponseEntity<ResponseDTO> getOrderId(@RequestHeader(value = "tokenId") String tokenId) {
		Long uuidPlaceOrder = orderService.getOrderByToken(tokenId);
		ResponseDTO responseDTO = new ResponseDTO("Order Id Get successfully", uuidPlaceOrder);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}

}
