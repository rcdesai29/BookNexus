package com.rahil.book_nexus.history;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import com.rahil.book_nexus.common.BaseEntity;
import com.rahil.book_nexus.book.Book;
import com.rahil.book_nexus.user.User;

@Entity
@Getter
@Setter
@SuperBuilder
public class BookTransactionHistory extends BaseEntity {

}
