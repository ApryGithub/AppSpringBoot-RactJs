package com.restapi.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan({"controllers"})
@EntityScan({"com.restapi.entities"})
@EnableJpaRepositories({"repository"})
public class RestApriApplication {

	public static void main(String[] args) {
		SpringApplication.run(RestApriApplication.class, args);
	}

}
