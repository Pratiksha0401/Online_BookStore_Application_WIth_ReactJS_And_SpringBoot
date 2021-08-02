package com.bridgelabz.Bookstore.service;

import java.util.List;
import java.util.UUID;

import com.bridgelabz.Bookstore.model.WishList;

public interface IWishListService {
	
	List<WishList>getBooks(String token);

	String addBookToWishList(String token,  UUID bookId);

	String deleteBookFromWishList(String token, UUID wishListId);

}
