package com.bridgelabz.Bookstore.model;

import java.util.Optional;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;

import com.bridgelabz.Bookstore.dto.OrderAddressDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAddress {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Type(type="uuid-char")
	private UUID id;
	private String fullName;
	private String mobNo;
	private String address;
	private String city;
	private String state;
	private String type;
	
	@OneToOne
	private CartDetails cartDetails;
	
	public OrderAddress(OrderAddressDto orderAddressDto, CartDetails cartData) {
		this.fullName=orderAddressDto.getFullName();
		this.address=orderAddressDto.getAddress();
		this.mobNo=orderAddressDto.getMobNo();
		this.city=orderAddressDto.getCity();
		this.state=orderAddressDto.getState(); 
		this.type=orderAddressDto.getType();
	}
	
	public OrderAddress(OrderAddressDto orderAddressDto) {
		this.fullName=orderAddressDto.getFullName();
		this.address=orderAddressDto.getAddress();
		this.mobNo=orderAddressDto.getMobNo();
		this.city=orderAddressDto.getCity();
		this.state=orderAddressDto.getState(); 	
	}
	
}
