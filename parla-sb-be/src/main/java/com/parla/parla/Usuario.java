package com.parla.parla;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "usuario")
public class Usuario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cod_usuario;
	private String nome;
	private String email;
	private String senha;
	private String photo;

	public Usuario() {
	};

	public Usuario(int cod_usuario, String nome, String email, String senha) {
		this.cod_usuario = cod_usuario;
		this.nome = nome;
		this.email = email;
		this.senha = senha;
	}

	public int getCod_usuario() {
		return cod_usuario;
	}

	public void setCod_usuario(int cod_usuario) {
		this.cod_usuario = cod_usuario;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	 
	public String getPhoto() {
		return photo;
	}

	public void setPhoto(String photo) {
		this.photo = photo;
	}

	@Override
	public String toString() {
		return "Usuario [cod_usuario=" + cod_usuario + ", nome=" + nome + ", email=" + email + ", senha=" + senha + "]";
	}

}
