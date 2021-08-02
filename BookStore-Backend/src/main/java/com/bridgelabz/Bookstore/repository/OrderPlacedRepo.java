package com.bridgelabz.Bookstore.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bridgelabz.Bookstore.model.OrderPlaced;

public interface OrderPlacedRepo extends JpaRepository<OrderPlaced, Long>{

}
