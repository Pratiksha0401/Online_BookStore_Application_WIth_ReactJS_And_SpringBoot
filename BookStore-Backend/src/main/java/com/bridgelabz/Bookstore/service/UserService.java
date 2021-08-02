package com.bridgelabz.Bookstore.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.bridgelabz.Bookstore.dto.ResetPasswordDto;
import com.bridgelabz.Bookstore.dto.UpdateUserDTO;
import com.bridgelabz.Bookstore.dto.UserDataDTO;
import com.bridgelabz.Bookstore.dto.UserLoginDTO;
import com.bridgelabz.Bookstore.exception.UserDataException;
import com.bridgelabz.Bookstore.model.OtpModel;
import com.bridgelabz.Bookstore.model.UserData;
import com.bridgelabz.Bookstore.repository.OtpModelRepo;
import com.bridgelabz.Bookstore.repository.UserDataRepository;
import com.bridgelabz.Bookstore.utils.EmailService;
import com.bridgelabz.Bookstore.utils.OtpGenerator;
import com.bridgelabz.Bookstore.utils.Token;

@Service
public class UserService implements IUserDataService {
	
	@Autowired
	private UserDataRepository userdatarepo;
	
	@Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
    private EmailService emailService;
	
	@Autowired
	private OtpModelRepo otprepo;
	OtpGenerator otpSender = new OtpGenerator();
	
	Token jwtToken = new Token();
	
	@Override
	public UserData createNewUser(UserDataDTO userdto) {
		Optional<UserData> checkEmailId = userdatarepo.findByEmailID(userdto.getEmailId());
		if(checkEmailId.isPresent()) {
			throw new UserDataException("User already exists with " + userdto.getEmailId() + " email Id");
		}
		else {
			String password = bCryptPasswordEncoder.encode(userdto.getPassword());	
			userdto.setPassword(password);
		    UserData userdata = new UserData(userdto.getFullName(),
		    		                         userdto.getPhoneNumber(),
		    		                         userdto.getEmailId(),
		    		                         password);
		    UserData savedata = userdatarepo.save(userdata);
		    String tokenId = jwtToken.generateVerificationtoken(userdata);
		    String requestUrl ="http://localhost:3000/verify/"+tokenId;
		    try {
	            emailService.sendMail(requestUrl,"the verification link is ", userdto.getEmailId());
	        } catch (MessagingException e) {
	            e.printStackTrace();
	        }
		    return savedata;
	    }
	}
	
	@Override
	public void verifyEmail(String tokenId) {
		UUID token = jwtToken.decodeJWT(tokenId);
		Optional<UserData> userId= userdatarepo.findById(token);
		if(!userId.isPresent()) {
			throw new UserDataException(("User is not PRESESNT")); 
		}
		userId.get().isVerified=true;
		userdatarepo.save(userId.get());
	}
	
	@Override
	public UserData getUserById(String tokenId) {
		UUID token = jwtToken.decodeJWT(tokenId);
		UserData userData= userdatarepo.findById(token).orElseThrow(() -> new UserDataException("User is not PRESESNT"));
		
		if(userData.isVerified=true) {
			return userData;
		}else {
			throw new UserDataException(("User is not Verified")); 
		}
		
	}
	
	@Override
	public String userLogin(UserLoginDTO userLoginDto) {
		  Optional<UserData> userEmail = userdatarepo.findByEmailID(userLoginDto.getEmailId());
		  if (!userEmail.isPresent()) {
	            throw new UserDataException("User with " + userLoginDto.getEmailId() + "  is not PRESESNT");
	      }
		  if(userEmail.get().isVerified){
	            boolean password = bCryptPasswordEncoder.matches(userLoginDto.getPassword(), userEmail.get().getPassword());
	            if (!password) {
	                throw new UserDataException("Password is not matched");
	            }
	            String tokenString = jwtToken.generateVerificationtoken(userEmail.get());
	            return tokenString;
	        }
	        throw  new UserDataException("Invalid User");
	}
	
	@Override
    public String sendPasswordResetLink(String email) throws MessagingException {
        UserData userdata = userdatarepo.findByEmailID(email)
        		            .orElseThrow(() -> new UserDataException("Invalid Email Id"));
        //long otp = otpSender.otpGenerater(); 
        String token = jwtToken.generateVerificationtoken(userdata);
        //OtpModel otpModel = new OtpModel(otp,token);
        //otprepo.save(otpModel);
        String urlToken = "http://localhost:3000/reset/"+ token;
        emailService.sendMail(urlToken, "To RESET Password", userdata.getEmailID());
        return token;
	}
	
	@Override
	public String resetPassword(ResetPasswordDto resetPasswordDto , String token) {
		UUID userId = jwtToken.decodeJWT(token);
		UserData userdata = userdatarepo.findById(userId)
				             .orElseThrow(() -> new UserDataException("User not found"));
		
		String encodePassword = bCryptPasswordEncoder.encode(resetPasswordDto.getPassword());
		userdata.setPassword(encodePassword);
		userdatarepo.save(userdata);
        return "Password is Successfully Reset";
	}

	@Override
	public UserData updateUserData(String token,UpdateUserDTO userData) {
		UUID userId = jwtToken.decodeJWT(token);
		UserData userdata = userdatarepo.findById(userId)
				             .orElseThrow(() -> new UserDataException("User not found"));
		userdata.setFullName(userData.getFullName());
		userdata.setPhoneNumber(userData.getPhoneNumber());
		UserData updatedData=userdatarepo.save(userdata);
		return updatedData;
	}
	
//	@Override
//	public List<UserData> getUserData(String token) {
//		UUID userId = jwtToken.decodeJWT(token);
//		UserData userData = userdatarepo.findById(userId)
//				             .orElseThrow(() -> new UserDataException("User not found"));
//		String name=userData.getFullName();
//		String email = userData.getEmailID();
//		String mobileNum=userData.getPhoneNumber();
//		List<UserData> userDataList= new ArrayList<>();
//		userDataList.add(name,email,mobileNum);
//        return userDataList;
//	}


}
