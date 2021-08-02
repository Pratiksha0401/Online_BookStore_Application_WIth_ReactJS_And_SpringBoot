package com.bridgelabz.Bookstore.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bridgelabz.Bookstore.exception.UserDataException;
import com.bridgelabz.Bookstore.model.BookData;
import com.bridgelabz.Bookstore.model.UserData;
import com.bridgelabz.Bookstore.model.WishList;
import com.bridgelabz.Bookstore.repository.BookDataRepo;
import com.bridgelabz.Bookstore.repository.UserDataRepository;
import com.bridgelabz.Bookstore.repository.WishListRepository;
import com.bridgelabz.Bookstore.utils.Token;

@Service
public class WishListService implements IWishListService {

	@Autowired
	Token jwtToken;

	@Autowired
	private WishListRepository wishListRepository;

	@Autowired
	private UserDataRepository userDataRepo;

	@Autowired
	private BookDataRepo bookDataRepo;

	public UserData isUserPresent(String token) {
		UUID userId = jwtToken.decodeJWT(token);
		Optional<UserData> userDetailsById = userDataRepo.findById(userId);

		if (!userDetailsById.isPresent()) {
			throw new UserDataException("User Not Found");
		}
		return userDetailsById.get();
	}

	@Override
	public List<WishList> getBooks(String token) {
		UserData userData = isUserPresent(token);
		//UUID userId = userData.getUserId();

//        if (cartDetailsList.size() == 0)
//            throw new BookDataException("No Books Found");
		return userData.getWishList();
	}

	@Override
	public String addBookToWishList(String token, UUID bookId) {
		UserData userData = this.isUserPresent(token);
//		UUID userId = userData.getUserId();
		BookData bookData = bookDataRepo.findByBookId(bookId);
		WishList wishList = new WishList(bookData);
		List<WishList> wishListDetails= userData.getWishList();
		wishListDetails.add(wishList);

		wishListRepository.saveAll(wishListDetails);
		return "Book added to WishList sucessfully";

	}
	
	@Override
	public String deleteBookFromWishList(String token, UUID wishListId) {
		UserData userData = this.isUserPresent(token);
        List<WishList> wishListList=userData.getWishList();
        WishList wishListData = wishListList.stream()
                .filter(wishList1 -> wishList1.getWishListId().equals(wishListId))
                .findFirst().get();
        wishListList.remove(wishListData);
        userData.setWishList(wishListList);
        userDataRepo.save(userData);
        wishListRepository.deleteById(wishListId);
        return "WishList Deleted successfully";
	}

}
