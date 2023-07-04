package com.parla.parla;

import java.util.List;


import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class PostController {
	@Autowired
	private PostRepository repository;
	
	// Resgatar Posts
	@GetMapping("/posts")
	public List<Post> getPost() {
		Sort sort = Sort.by(Sort.Direction.ASC, "dia_criado");
		return repository.findAll(sort);
	}
	
	// Criar Post					-- (texto, cod_usuario)
	@PostMapping("/posts")
	public @ResponseBody Post createPost (@Valid @RequestBody Post parlaPost) {
		return repository.save(parlaPost);
	}
	
	@DeleteMapping("/posts/{id}")
	public void excluirPost(@PathVariable int id) {
		repository.deleteById(id);
	}
	
	
}