package com.bridgelabz.Bookstore.dto;

import java.util.UUID;

import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartDetailsDto {
	
	@Min(value = 1, message = "Please Enter Valid Quantity")
	private Long quantity;

	private String status;

}
