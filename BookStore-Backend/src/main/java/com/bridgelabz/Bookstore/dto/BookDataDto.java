package com.bridgelabz.Bookstore.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDataDto {

	@NotNull
	private String bookName;

	@NotNull
	private String bookAuthor;

	private Double rating;

	@NotNull
	private Double bookPrice;
	
	private Double bookOldPrice;

	@NotNull
	private Long bookQuantity;

	private String bookDescription;

	@NotNull
	private String bookImage;
}
