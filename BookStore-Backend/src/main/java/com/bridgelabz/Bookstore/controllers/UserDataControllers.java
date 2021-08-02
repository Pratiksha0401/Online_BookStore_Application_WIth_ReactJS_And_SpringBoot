package com.bridgelabz.Bookstore.controllers;

import java.util.List;
import java.util.Optional;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

import com.bridgelabz.Bookstore.dto.ResetPasswordDto;
import com.bridgelabz.Bookstore.dto.ResponseDTO;
import com.bridgelabz.Bookstore.dto.UpdateUserDTO;
import com.bridgelabz.Bookstore.dto.UserDataDTO;
import com.bridgelabz.Bookstore.dto.UserLoginDTO;
import com.bridgelabz.Bookstore.model.UserData;
import com.bridgelabz.Bookstore.repository.UserDataRepository;
import com.bridgelabz.Bookstore.service.IUserDataService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserDataControllers {

	@Autowired
	private IUserDataService userservice;
	
	@Autowired
	private UserDataRepository userRepo;

	@GetMapping("/getcartdetails")
	public List<UserData> getCartData() {
		return userRepo.findAll();
	}
	
	@GetMapping("/getUserData")
	public List<UserData> getUserData() {
		return userRepo.findAll();
	}
	
	@GetMapping("/getUserDataById")
	public ResponseEntity<ResponseDTO> getUserDataById(@RequestHeader(value = "token") String token) {
		UserData userData = userservice.getUserById(token);
		ResponseDTO respdto = new ResponseDTO("Getting User Successfully", userData);
		return new ResponseEntity<ResponseDTO>(respdto, HttpStatus.OK);
	}

	@PostMapping("/create")
	public ResponseEntity<ResponseDTO> addUserData(@Valid @RequestBody UserDataDTO userdto) {
		UserData userdata = userservice.createNewUser(userdto);
		ResponseDTO respdto = new ResponseDTO("Created New User Successfully", userdata);
		return new ResponseEntity<ResponseDTO>(respdto, HttpStatus.OK);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@GetMapping("/verify/email/{tokenId}")
	public ResponseEntity verifyEmail(@PathVariable String tokenId) {
		userservice.verifyEmail(tokenId);
		return new ResponseEntity("Link sent", HttpStatus.OK);
	}

	@PostMapping("/login")
	public ResponseEntity<ResponseDTO> userlogin(@Valid @RequestBody UserLoginDTO userLoginDTO) {
		String userLogin = userservice.userLogin(userLoginDTO);
		UserData userData=userservice.getUserById(userLogin);
		ResponseDTO response = new ResponseDTO( userLogin, userData);
		return new ResponseEntity<ResponseDTO>(response, HttpStatus.OK);
	}

	@PostMapping("/reset/link/{emailId}")
	public ResponseEntity<ResponseDTO> sendResetLink(@PathVariable(value = "emailId") String emailId,
			HttpServletResponse httpServletResponse) throws MessagingException {
		String token = userservice.sendPasswordResetLink(emailId);

		ResponseDTO respdto = new ResponseDTO("Reset Link Sent successfully", token);
		return new ResponseEntity<ResponseDTO>(respdto, HttpStatus.OK);
	}

	@PutMapping(value = "/reset/password")
	public ResponseEntity<ResponseDTO> setNewPassword(@RequestHeader("tokenId") String tokenId,
			@ModelAttribute ResetPasswordDto resetDto) {

		String setpassword = userservice.resetPassword(resetDto, tokenId);
		ResponseDTO respdto = new ResponseDTO("New Password has been set successfully", setpassword);
		return new ResponseEntity<ResponseDTO>(respdto, HttpStatus.OK);
	}
	
	@PutMapping(value = "/updateUserData")
	public ResponseEntity<ResponseDTO> updateUserData(@RequestHeader("token") String token,
			@RequestBody UpdateUserDTO userDataDto) {

		UserData response=userservice.updateUserData(token,userDataDto);
		ResponseDTO respdto = new ResponseDTO("User has been updated successfully",response);
		return new ResponseEntity<ResponseDTO>(respdto, HttpStatus.OK);
	}
	
}
