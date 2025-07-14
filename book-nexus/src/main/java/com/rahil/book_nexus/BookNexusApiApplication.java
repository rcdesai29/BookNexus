package com.rahil.book_nexus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class BookNexusApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookNexusApiApplication.class, args);
	}

}
