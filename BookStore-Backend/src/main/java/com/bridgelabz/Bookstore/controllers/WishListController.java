package com.bridgelabz.Bookstore.controllers;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.Bookstore.dto.ResponseDTO;
import com.bridgelabz.Bookstore.model.WishList;
import com.bridgelabz.Bookstore.service.IWishListService;

@CrossOrigin
@RestController
public class WishListController {

	@Autowired
	private IWishListService wishListService;

	@GetMapping("/getWishList")
	public ResponseEntity<ResponseDTO> getBooks(@RequestHeader(value = "token") String token) {
		List<WishList> cartDetailsList = wishListService.getBooks(token);
		ResponseDTO responseDTO = new ResponseDTO("Response Successful", cartDetailsList);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}

	@PostMapping("/addBookToWishList/{bookId}")
	public ResponseEntity<ResponseDTO> addBookToWishList(@RequestHeader(value = "token") String token,
			@PathVariable UUID bookId) {

		String wishListData = wishListService.addBookToWishList(token, bookId);

		ResponseDTO responseDTO = new ResponseDTO("Response Successful", wishListData);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}

	@DeleteMapping("/deleteWishList/{wishListId}")
	public ResponseEntity<ResponseDTO> deleteCart(@RequestHeader(value = "token") String token,
			@PathVariable("wishListId") UUID wishListId) {

		String wishListData = wishListService.deleteBookFromWishList(token, wishListId);

		ResponseDTO responseDTO = new ResponseDTO("Response Successful", wishListData);
		return new ResponseEntity<>(responseDTO, HttpStatus.OK);
	}

}
