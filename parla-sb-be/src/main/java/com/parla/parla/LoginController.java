package com.parla.parla;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@CrossOrigin(origins = "*")
public class LoginController {
	@Autowired
	UsuarioRepository repository;
		
	@PostMapping
	public ResponseEntity<Boolean> logar(@RequestBody Usuario usuario, HttpServletResponse response) {
		Usuario user = repository.findByNomeAndSenha(usuario.getNome(), usuario.getSenha());
		if (user != null) {
//			CookieService.setCookie(response, "usuarioId", String.valueOf(user.getCod_usuario()), 60);
			return ResponseEntity.status(HttpStatus.OK).body(true);
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(false);
		}
	}
	

}
