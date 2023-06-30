import { useState } from "react";
import axios from "axios";
import "./css/Login.css";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://parlaapi.roddgarcia.repl.co/",
        {
          nome: username,
          senha: password,
        }
      );

      if (response.data) {
        fetch(
          "https://parlaapi.roddgarcia.repl.co/encontrarUser?nome=" + username
        )
          .then((response) => response.json())
          .then((data) => {
            onLoginSuccess(data[0]);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        setError("Erro ao logar.");
      }
    } catch (error) {
      setError("Usuário ou senha inválido.");
      console.error("Deu merda: " + error);
    }
  };

  const registrar = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "https://parlaapi.roddgarcia.repl.co/usuarios",
        {
          nome: username,
          senha: password,
          email: email,
        }
      );

      if (response.status === 201) {
        alert("Usuário criado com sucesso.");
        window.location.reload(true);
      } else if (response.status === 400) {
        setError("Usuário ou E-mail já registrado.");
      } else {
        setError("Usuário ou E-mail já registrado.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError("Usuário ou E-mail inválidos.");
      } else {
        setError("Ocorreu um erro ao processar a solicitação.");
      }
    }
  };

  const [loginMode, setLoginMode] = useState(false);

  const changeLoginMode = () => {
    if (!loginMode) {
      document.getElementById("login").style.display = "none";
      document.getElementById("register").style.display = "flex";
      setError("");
      setLoginMode(true);
    } else {
      document.getElementById("login").style.display = "flex";
      document.getElementById("register").style.display = "none";
      setError("");
      setUsername("");
      setPassword("");
      setEmail("");
      setLoginMode(false);
    }
  };

  return (
    <>
      <main>
        <div id="login">
          <div id="Loginphoto">
            {/* <img src="./imgs/cafeChatting.jpg" /> */}
          </div>
          <container>
            <h1>Logue no Parla!</h1>
            <form id="loginForm" onSubmit={handleLogin}>
              <input
                type="text"
                id="usernameInput"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="usernameInput"
                placeholder="USUÁRIO"
                maxLength={20}
                required
              />
              <input
                type="password"
                id="passwordInput"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="passwordinput"
                placeholder="SENHA"
                maxLength={20}
                required
              />

              {error === "" ? null : (
                <div role="alert" id="errorWarning">
                  {error}
                </div>
              )}

              <div id="submitBtns">
                <button type="submit">Enviar</button>
                <button type="button" onClick={changeLoginMode}>
                  Cadastrar
                </button>
              </div>
            </form>
          </container>
        </div>

        <div id="register">
          <div id="login">
            <container>
              <h1>Registre-se!</h1>
              <form id="loginForm" onSubmit={registrar}>
                <input
                  type="text"
                  id="usernameInput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="usernameInput"
                  placeholder="USUÁRIO"
                  maxLength={20}
                  minLength={3}
                  required
                />
                <input
                  type="email"
                  id="passwordInput"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="passwordinput"
                  placeholder="E-MAIL"
                  minLength={8}
                  maxLength={100}
                  required
                />
                <input
                  type="password"
                  id="passwordInput"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="passwordinput"
                  placeholder="SENHA"
                  maxLength={20}
                  minLength={8}
                  required
                />

                {error === "" ? null : (
                  <div role="alert" id="errorWarning">
                    {error}
                  </div>
                )}

                <div id="submitBtns">
                  <button type="submit" onClick={registrar}>
                    Registrar
                  </button>
                  <button type="button" onClick={changeLoginMode}>
                    Voltar
                  </button>
                </div>
              </form>
            </container>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
