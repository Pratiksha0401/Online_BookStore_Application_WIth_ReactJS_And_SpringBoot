package com.bridgelabz.Bookstore.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.Type;

import com.bridgelabz.Bookstore.dto.UpdateUserDTO;
import com.bridgelabz.Bookstore.dto.UserDataDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Entity
public @Data class UserData {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Type(type="uuid-char")
	private UUID userId;
	
	private String fullName;
	private String phoneNumber;
	private String emailID;
	private String password;
	public boolean isVerified;
    public LocalDateTime createdAt = LocalDateTime.now();
    
    @OneToMany(cascade = CascadeType.ALL)
    private List<CartDetails> cartDetailsList = new ArrayList<>();
     
    @ManyToMany
	private List<WishList> wishList;
    
    @OneToMany
    private List<OrderPlaced> placedOrderedList;
    
    public UserData() { }
    
	public UserData(UserDataDTO userdto) {
		this.fullName = userdto.getFullName();
		this.phoneNumber = userdto.getPhoneNumber();
		this.emailID = userdto.getEmailId();
		this.password = userdto.getPassword();
	}

	public UserData(UUID userId, UserDataDTO userdto) {
		this.userId = userId;
		this.fullName = userdto.getFullName();
		this.phoneNumber = userdto.getPhoneNumber();
		this.emailID = userdto.getEmailId();
		this.password = userdto.getPassword();
	}
	
    public UserData(String fullName, String phoneNumber, String emailID, String password) {
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.emailID = emailID;
		this.password = password;
	}
    
    public UserData(UpdateUserDTO userdto) {
		this.fullName = userdto.getFullName();
		this.phoneNumber = userdto.getPhoneNumber();
	}
    
    public void addToWishList(WishList wishList) {
        this.wishList.add(wishList);
    }

    public void addToCart(CartDetails cartDetails){
        this.cartDetailsList.add(cartDetails);
    }
    
    public void addOrders(OrderPlaced orderPlaced){
        this.placedOrderedList.add(orderPlaced);
    }

}
