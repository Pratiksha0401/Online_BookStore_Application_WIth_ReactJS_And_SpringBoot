package com.bridgelabz.Bookstore.model;

import java.time.LocalDateTime;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.bridgelabz.Bookstore.dto.BookDataDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "book_data")
public class BookData {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "book_id")
	@Type(type = "uuid-char")
	private UUID bookId;

	@Column(name = "book_name")
	private String bookName;

	@Column(name = "book_author")
	private String bookAuthor;

	private Double rating;

	@Column(name = "book_price")
	private Double bookPrice;
	
	private Double bookOldPrice;

	@Column(name = "book_quantity")
	private Long bookQuantity;

	@Column(name = "book_desciption")
	private String bookDescription;

	@Column(name = "book_image")
	private String bookImage;
	
	public LocalDateTime createdAt = LocalDateTime.now();
	
	public BookData(UUID bookId, BookDataDto bookDataDto) {
		this.bookId = bookId;
		this.bookName = bookDataDto.getBookName();
		this.bookAuthor = bookDataDto.getBookAuthor();
		this.rating = bookDataDto.getRating();
		this.bookPrice = bookDataDto.getBookPrice();
		this.bookOldPrice=bookDataDto.getBookOldPrice();
		this.bookQuantity = bookDataDto.getBookQuantity();
		this.bookDescription = bookDataDto.getBookDescription();
		this.bookImage = bookDataDto.getBookImage();
	}

	public BookData(BookDataDto bookDataDto) {
		this.bookName = bookDataDto.getBookName();
		this.bookAuthor = bookDataDto.getBookAuthor();
		this.rating = bookDataDto.getRating();
		this.bookPrice = bookDataDto.getBookPrice();
		this.bookOldPrice=bookDataDto.getBookOldPrice();
		this.bookQuantity = bookDataDto.getBookQuantity();
		this.bookDescription = bookDataDto.getBookDescription();
		this.bookImage = bookDataDto.getBookImage();
	}
}