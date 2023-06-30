import React, { useState } from "react";
import "./Popup.css";
import "../css/App.css";
import "./Perfil.css";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const Perfil = (props) => {
  const [nome, setNome] = useState(props.user.nome);
  const [email, setEmail] = useState(props.user.email);
  const [senha, setSenha] = useState(props.user.senha);
  const [photo, setPhoto] = useState(props.user.photo);

  function numAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const btnImgHomem = () => {
    setPhoto(
      `https://randomuser.me/api/portraits/men/${numAleatorio(1, 99)}.jpg`
    );
  };
  const btnImgMulher = () => {
    setPhoto(
      `https://randomuser.me/api/portraits/women/${numAleatorio(1, 99)}.jpg`
    );
  };

  const enviarNovoPerfil = async (e) => {
    e.preventDefault();

    const body = {
      photo: photo,
      nome: nome.toLowerCase(),
      email: email.toLowerCase(),
      senha: senha,
    };

    axios
      .put(
        "https://parlaapi.roddgarcia.repl.co/usuarios/" +
          props.user.cod_usuario,
        body
      )
      .then(() => {
        alert("Usuário alterado!");
        window.location.reload(true);
      })
      .catch((error) => console.error("Error de PUT METHOD: ", error));
  };

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  return props.trigger ? (
    <>
      <div className="popup">
        <div className="popup-inner">
          <div id="btnFechar">
            <RxCross1
              size={"30px"}
              className="icon-close-btn"
              onClick={() => {
                props.setTrigger(false);
                document.getElementById("App").style.overflow = "scroll";
              }}
            />
          </div>
          <form id="formPut">
            <label id="fotoLabel">Foto de Perfil</label>
            {photo === null ? (
              <img src="./imgs/default.png" alt="Foto de perfil" />
            ) : (
              <img src={photo} alt="Foto de perfil" />
            )}
            <id id="genderBtns">
              <input type="button" value="Homem" onClick={btnImgHomem} />
              <input type="button" value="Mulher" onClick={btnImgMulher} />
            </id>
            <label>Nome</label>
            <input
              onChange={(e) => setNome(e.target.value.toLowerCase())}
              type="text"
              value={nome}
              maxLength={20}
              onKeyDown={handleKeyDown}
            />
            <label>E-mail</label>
            <input
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
              type="text"
              value={email}
              maxLength={30}
              onKeyDown={handleKeyDown}
            />
            <label>Senha</label>
            <input
              onChange={(e) => setSenha(e.target.value)}
              type="text"
              value={senha}
              maxLength={20}
            />
            <input type="submit" onClick={enviarNovoPerfil} value="Alterar" />
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};
export default Perfil;
