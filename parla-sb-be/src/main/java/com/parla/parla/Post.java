package com.parla.parla;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "post")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cod_post")
	private int id;
	private String texto;
	// private int cod_usuario;
	private int likes;

	@CreationTimestamp
	private Timestamp dia_criado;

	@ManyToOne(optional = false)
	@JoinColumn(name = "cod_usuario")
	private Usuario usuario;

	public Post() {
	};

	public Post(int id, String texto, int likes) {
		this.id = id;
		this.texto = texto;
		// this.cod_usuario = cod_usuario;
		this.likes = likes;
	}

	public int getid() {
		return id;
	}

	public void setid(int id) {
		this.id = id;
	}

	public String getTexto() {
		return texto;
	}

	public void setTexto(String texto) {
		this.texto = texto;
	}

	// public Timestamp getDia_criado() {
	// return dia_criado;
	// }

	public void setDia_criado(Timestamp dia_criado) {
		this.dia_criado = dia_criado;
	}

	public String getDia_criado() {
		SimpleDateFormat formatador = new SimpleDateFormat("HH:mm");
		return formatador.format(dia_criado);
	}

	public String getDataCriada() {
		SimpleDateFormat formatData = new SimpleDateFormat("dd/MM/yyyy");
		return formatData.format(dia_criado);
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuatio(Usuario usuario) {
		this.usuario = usuario;
	}

	public int getLikes() {
		return likes;
	}

	public void setLikes(int likes) {
		this.likes = likes;
	}

	@Override
	public String toString() {
		return "ParlaPost [id=" + id + ", texto=" + texto + ", likes="
				+ likes
				+ "]";
	}

}
