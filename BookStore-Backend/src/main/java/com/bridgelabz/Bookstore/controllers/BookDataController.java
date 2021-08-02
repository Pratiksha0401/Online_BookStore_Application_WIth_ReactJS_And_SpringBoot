package com.bridgelabz.Bookstore.controllers;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bridgelabz.Bookstore.dto.BookDataDto;
import com.bridgelabz.Bookstore.dto.ResponseDTO;

import com.bridgelabz.Bookstore.model.BookData;
import com.bridgelabz.Bookstore.service.IBookService;

@CrossOrigin
@RestController
@RequestMapping("bookdata")
public class BookDataController {

	@Autowired
	private IBookService bookService;

	@PostMapping("/addbook")
	public ResponseEntity<ResponseDTO> addBook(@Valid @RequestBody BookDataDto bookDto) {
		BookData data = bookService.addNewBook(bookDto);
		ResponseDTO responseDto = new ResponseDTO("Book Added Successfully!!", data);
		return new ResponseEntity<ResponseDTO>(responseDto, HttpStatus.OK);
	}

	@GetMapping("/books/{pageNo}")
    public ResponseEntity<ResponseDTO> getBook(@PathVariable Integer pageNo) {
        List<BookData> bookDetailsList = bookService.getAllBooks(pageNo, 12);
        ResponseDTO responseDTO = new ResponseDTO( "Get Response Successful",bookDetailsList);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
	
	@GetMapping("/{bookId}")
    public ResponseEntity<ResponseDTO> getBookById(@PathVariable UUID bookId) {
        ResponseDTO responseDTO = new ResponseDTO( "Get Book Data Successful",bookService.getBookById(bookId));
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }

	@GetMapping("/getbookcount")
	public ResponseEntity<ResponseDTO> getBookCount() {
		Long bookCount = bookService.getBooksCount();
		ResponseDTO responseDto = new ResponseDTO("Total Book Count!!", bookCount);
		return new ResponseEntity<ResponseDTO>(responseDto, HttpStatus.OK);
	}
	
	@GetMapping("/books/HighToLow/{pageNo}")
    public ResponseEntity<ResponseDTO> getBooksByHighToLow(@PathVariable Integer pageNo) {
        List<BookData> bookDetailsList = bookService.getAllBookByPriceHighToLow(pageNo, 12);
        ResponseDTO responseDTO = new ResponseDTO( "High To Low Response Successful",bookDetailsList);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
	
	@GetMapping("/books/LowToHigh/{pageNo}")
    public ResponseEntity<ResponseDTO> getBooksByLowToHigh(@PathVariable Integer pageNo) {
        List<BookData> bookDetailsList = bookService.getAllBookByPriceLowToHigh(pageNo, 12);
        ResponseDTO responseDTO = new ResponseDTO( "Response Successful",bookDetailsList);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
	
	@GetMapping("/books/NewArraival/{pageNo}")
    public ResponseEntity<ResponseDTO> getBooksByNewArrival(@PathVariable Integer pageNo) {
        List<BookData> bookDetailsList = bookService.getAllBookByNewArrival(pageNo, 12);
        ResponseDTO responseDTO = new ResponseDTO( "Response Successful",bookDetailsList);
        return new ResponseEntity<>(responseDTO, HttpStatus.OK);
    }
	
	@GetMapping("/find/{name}")
	public ResponseEntity<ResponseDTO>findByName(
						@PathVariable String name)
	{
		List<BookData> addressBookData = bookService.searchBookByName(name);
		ResponseDTO responseDto = new ResponseDTO("The following names are", addressBookData);
		return new ResponseEntity<ResponseDTO>(responseDto, HttpStatus.OK);
	}
	
	@PutMapping("/updatequantity/{bookid}/{quantity}")
	public ResponseEntity<ResponseDTO> updateQuantity(@RequestHeader(value="tokenId") String tokenId,
													  @PathVariable UUID bookid,
													  @PathVariable Long quantity){
		String bookDataQty = bookService.updateQuantity(tokenId, bookid, quantity);
		ResponseDTO responseDto = new ResponseDTO("Update Quantity", bookDataQty);
		return new ResponseEntity<ResponseDTO>(responseDto, HttpStatus.OK);
	}

}
