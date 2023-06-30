package com.parla.parla;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer>{
	@Query(value="SELECT * FROM USUARIO WHERE nome = :usernameInput AND senha = :passwordInput", nativeQuery = true)
	Usuario findByNomeAndSenha(String usernameInput, String passwordInput);
	
	List<Usuario> findByNomeIgnoreCase(String nome);
	List<Usuario> findByEmailIgnoreCase(String email);
	
	@Transactional
	@Modifying
	@Query(value="UPDATE usuario SET nome = :nome, email=:email, senha=:senha WHERE cod_usuario = :id", nativeQuery = true)
	Usuario changeProfile(int id, String nome, String email, String senha);
}
