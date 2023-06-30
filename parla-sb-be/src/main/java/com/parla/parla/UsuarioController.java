package com.parla.parla;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class UsuarioController {
	@Autowired
	private UsuarioRepository repository;
	
	@GetMapping("/usuarios")
	public List<Usuario> getUsuarios() {
		return repository.findAll();
	}
	
	@PutMapping("/usuarios/{id}")
	public ResponseEntity<Usuario> mudarUser(
			@PathVariable("id") int id,
			@Valid @RequestBody Usuario usuario) {
	    Optional<Usuario> dadosUsuario = repository.findById(id);
	    
	    if (dadosUsuario.isPresent()) {
	    	Usuario novoEmpregado = dadosUsuario.get();
	      
	      novoEmpregado.setPhoto(usuario.getPhoto());
	      novoEmpregado.setNome(usuario.getNome());
	      novoEmpregado.setEmail(usuario.getEmail());
	      novoEmpregado.setSenha(usuario.getSenha());
	      
	      repository.save(novoEmpregado);
	      return new ResponseEntity<>(novoEmpregado, HttpStatus.OK);
	    }
	    else {
	      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }
	}
	
	@GetMapping("/encontrarUser")
	public List<Usuario> getSingleUsuario(@RequestParam("nome") String nome) {
		return repository.findByNomeIgnoreCase(nome);
	}
	
	@GetMapping("/usuarios/{id}")
	public Optional<Usuario> getSingleUsuario(@PathVariable("id") int id) {
		return repository.findById(id);
	}
	
	@PostMapping("/usuarios")
	public @ResponseBody ResponseEntity<Boolean> criarUsuario(@RequestBody @Valid Usuario usuario, Model model) {
	    List<Usuario> acharNomeUsuarioExistente = repository.findByNomeIgnoreCase(usuario.getNome());
	    List<Usuario> acharEmailUsuarioExistente = repository.findByEmailIgnoreCase(usuario.getEmail());
	    if (!acharNomeUsuarioExistente.isEmpty() || !acharEmailUsuarioExistente.isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
	    } else {
	    	repository.save(usuario);
	    	return ResponseEntity.status(HttpStatus.CREATED).body(true);
	    }
	}
}
