package com.parla.parla;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, Integer>{

    @Query("SELECT * FROM Post p ORDER BY p.cod_post DESC")
    List<Post> findAllOrderByCodPostDesc();
	
}
