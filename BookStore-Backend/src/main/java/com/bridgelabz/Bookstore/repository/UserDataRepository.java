package com.bridgelabz.Bookstore.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bridgelabz.Bookstore.model.CartDetails;
import com.bridgelabz.Bookstore.model.UserData;


@Repository
public interface UserDataRepository extends JpaRepository<UserData, UUID>  {
	
	Optional<UserData> findByEmailID(String emailId);
	
	
}
