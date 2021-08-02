package com.bridgelabz.Bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderAddressDto {
	private String fullName;
	private String mobNo;
	private String city;
	private String state;
	private String address;
	private String type;
}
