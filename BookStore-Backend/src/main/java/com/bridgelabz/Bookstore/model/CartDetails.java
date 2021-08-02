package com.bridgelabz.Bookstore.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;
import org.springframework.beans.factory.annotation.Value;

import com.bridgelabz.Bookstore.dto.CartDetailsDto;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Type(type = "uuid-char")
	private UUID cartId;
	
	private Long quantity;
	
	private String status;
	
	@OneToOne
	@JoinColumn(name="bookId",referencedColumnName = "book_id")
	private BookData bookData;
	
	@OneToOne
	private OrderAddress orderAddress;
	
//	UUID bookId=bookData.getBookId();
//	@JsonIgnore
//	@ManyToOne
//	@JoinColumn(name="userId",referencedColumnName = "userId")
//	private UserData userData;
	
//	public UUID getUserId(UserData userData) {
//		return userData.getUserId();
//	}
//	
//	public UUID getBookId(BookData bookData) {
//		return bookData.getBookId();
//	}
	
	public CartDetails( CartDetailsDto cartDetailsdto, BookData bookData) {
		this.quantity=cartDetailsdto.getQuantity();
		this.status=cartDetailsdto.getStatus();
		this.bookData=bookData;
		//this.userData=userData;
	}
	

	public CartDetails(CartDetailsDto cartDetailsdto) {
		this.quantity=cartDetailsdto.getQuantity();
		this.status=cartDetailsdto.getStatus();
	}
}
