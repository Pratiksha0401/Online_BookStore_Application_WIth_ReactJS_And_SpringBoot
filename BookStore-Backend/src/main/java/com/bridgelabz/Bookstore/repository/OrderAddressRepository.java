package com.bridgelabz.Bookstore.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bridgelabz.Bookstore.model.OrderAddress;

public interface OrderAddressRepository extends JpaRepository<OrderAddress, UUID> {

}
