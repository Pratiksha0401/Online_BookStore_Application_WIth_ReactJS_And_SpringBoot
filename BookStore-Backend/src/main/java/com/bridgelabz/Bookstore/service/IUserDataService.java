package com.bridgelabz.Bookstore.service;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;

import com.bridgelabz.Bookstore.dto.ResetPasswordDto;
import com.bridgelabz.Bookstore.dto.UpdateUserDTO;
import com.bridgelabz.Bookstore.dto.UserDataDTO;
import com.bridgelabz.Bookstore.dto.UserLoginDTO;
import com.bridgelabz.Bookstore.model.UserData;

public interface IUserDataService {
	
	public UserData createNewUser(UserDataDTO userdto);
	public void verifyEmail(String tokenId);
	public String userLogin(UserLoginDTO userLoginDto);
	public String sendPasswordResetLink(String emailId) throws MessagingException;
	//public long otpGenerator();
	//public String resetPassword(String password, String urlToken);
	public String resetPassword(ResetPasswordDto resetPasswordDto, String token);
	public UserData getUserById(String tokenId);
	UserData updateUserData(String token, UpdateUserDTO userData);
}
