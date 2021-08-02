package com.bridgelabz.Bookstore.dto;

import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserDTO {
//	@Pattern(regexp = "^[A-Z]{1}[a-z A-Z\\s]{2,}$", message = "Person Name Invalid")
	@NotBlank(message = "Name cannot be null")
	private String fullName;
	
//	@Pattern(regexp = "[+]{0,1}[0-9]{1,}\\s{0,1}[1-9]{1}[0-9]{9}$", message = "PhoneNumber is Invalid")
	@NotBlank(message = "PhoneNumber cannot be null")
	private String phoneNumber;

}
