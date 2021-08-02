package com.bridgelabz.Bookstore.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WishList {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Type(type = "uuid-char")
	private UUID wishListId;
	
	      
	@OneToOne
	@JoinColumn(name="bookId",referencedColumnName = "book_id")
	private BookData bookData;



	
//	public UUID getUserId(UserData userData) {
//		return userData.getUserId();
//	}
	
//	public UUID getBookId(BookData bookData) {
//		return bookData.getBookId();
//	}
	
	public WishList(BookData bookData) {
		
		this.bookData=bookData;

	}
	
//	public CartDetails(CartDetailsDto cartDetailsdto) {
//		this.quantity=cartDetailsdto.getQuantity();
//		this.status=cartDetailsdto.getStatus();
//	}
}
