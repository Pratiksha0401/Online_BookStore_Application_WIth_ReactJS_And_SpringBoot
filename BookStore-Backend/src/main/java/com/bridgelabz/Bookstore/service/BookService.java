package com.bridgelabz.Bookstore.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.bridgelabz.Bookstore.dto.BookDataDto;
import com.bridgelabz.Bookstore.exception.BookDataException;
import com.bridgelabz.Bookstore.model.BookData;
import com.bridgelabz.Bookstore.repository.BookDataRepo;

@Service
public class BookService implements IBookService {

	@Autowired
	private BookDataRepo bookDataRepo;

	@Override
	public BookData addNewBook(BookDataDto dto) {
		Optional<BookData> findBook = bookDataRepo.findByBookName(dto.getBookName());
		if (findBook.isPresent()) {
			throw new BookDataException("Book is already present");
		}
		BookData bookData = new BookData(dto);
		return bookDataRepo.save(bookData);
	}

	@Override
	public List<BookData> getAllBooks(Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize);
		Page<BookData> bookList = bookDataRepo.findAll(paging);
//		if (!bookList.hasContent()) {
//			throw new BookDataException("No Books Were Found On The Page");
//		}
		return bookList.getContent();
	}
	
	@Override
	public BookData getBookById(UUID bookId) {
//		if (!bookList.hasContent()) {
//			throw new BookDataException("No Books Were Found On The Page");
//		}
		return bookDataRepo.findByBookId(bookId);
	}


	@Override
	public List<BookData> getAllBookByPriceHighToLow(Integer pageNo, Integer pageSize) {

		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("bookPrice").descending());
		Page<BookData> bookList = bookDataRepo.findAll(paging);

		if (!bookList.hasContent()) {
			throw new BookDataException("No Books Were Found On The Page");
		}
		return bookList.getContent();

	}

	@Override
	public List<BookData> getAllBookByPriceLowToHigh(Integer pageNo, Integer pageSize) {

		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("bookPrice").ascending());
		Page<BookData> bookList = bookDataRepo.findAll(paging);

		if (!bookList.hasContent()) {
			throw new BookDataException("No Books Were Found On The Page");
		}
		return bookList.getContent();
	}

	@Override
	public List<BookData> getAllBookByNewArrival(Integer pageNo, Integer pageSize) {
		Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by("createdAt").descending());
		Page<BookData> bookList = bookDataRepo.findAll(paging);

		if (!bookList.hasContent()) {
			throw new BookDataException("No Books Were Found On The Page");
		}
		return bookList.getContent();
	}

	@Override
	public Long getBooksCount() {
		return bookDataRepo.count();
	}

	@Override
	public List<BookData> searchBookByName(String name) {
		List<BookData> bookList = bookDataRepo.findByBookNameContaining(name);
		if (bookList.isEmpty()) {
			throw new BookDataException("No Books Were Found On The Page");
		}
		return bookList;
	}
	
	@Override
	public String updateQuantity(String token, UUID bookId, Long quantity) {
		BookData bookData=bookDataRepo.findByBookId(bookId);
		bookData.setBookQuantity(quantity);
		bookDataRepo.save(bookData);
		return "Book Quantity Updated";	
	}
}
