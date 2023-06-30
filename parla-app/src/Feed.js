import { MdOutlinePerson } from "react-icons/md";
import { useState, useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { RxExit } from "react-icons/rx";
import Posts from "./SinglePost";
import Perfil from "./components/Perfil";
import "./css/NavBar.css";
import "./css/postBarPC.css";
import axios from "axios";

const Feed = ({ onLogout, user }) => {
  const BaseURL = "http://192.168.15.21:8080/posts";

  const [feed, setFeed] = useState([]);
  const [perfil, setPerfil] = useState();

  const [tamanho, setTamanho] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    getDados();

    const interval = setInterval(() => {
      getDados();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const enviarPost = async (e) => {
    console.log(user.cod_usuario);
    if (tamanho === 0) {
      alert("Área de texto está vazia.");
    } else {
      axios
        .post("http://192.168.15.21:8080/posts", {
          texto: text,
          usuario: { cod_usuario: user.cod_usuario },
        })
        .then(() => {
          console.log("Post enviado!");
          getDados();
        })
        .catch((error) => console.error("Error: ", error));
    }
    setText("");
    setTamanho(0);
  };

  const contador = (e) => {
    const valor = e.target.value;
    setText(valor);
    const valorCaracteres = e.target.value;
    setTamanho(valorCaracteres.length);
    if (valorCaracteres.length > 35) {
      document.getElementById("tamanhoTexto").style.color = "red";
    } else {
      document.getElementById("tamanhoTexto").style.color = "black";
    }
  };

  const getDados = () => {
    axios
      .get(BaseURL)
      .then((response) => {
        setFeed(response.data);
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleLogout = () => {
    onLogout(false);
  };
  return (
    <>
      <div className="App" id="App" onLoad={getDados}>
        <Perfil user={user} trigger={perfil} setTrigger={setPerfil} />
        <nav>
          <img alt="logo" src="./parlaLogo.jpg" />
        </nav>
        <div id="postArea">
          <textarea
            type="text"
            id="userInp"
            maxLength={"60"}
            onChange={contador}
            value={text}
          />
          <div id="pc_sendBar">
            <div id="tamanhoTexto">Caracteres: {tamanho} / 60</div>
            <div id="btnEnviar">
              <button onClick={enviarPost}>{"PARLAR!"}</button>
            </div>
          </div>
        </div>
        <content>
          {feed
            .slice()
            .reverse()
            .map((feed) => {
              return <Posts getDados={getDados} user={user} data={feed} />;
            })}
        </content>
        <div className="navBar">
          <ul>
            <div id="btnHome">
              <IoMdHome size={"40px"} color={"#dad7cd"} />
              <li>Home</li>
            </div>
            {/* <div
              id="btnPost"
              onClick={() => {
                setPopup(true);
                // document.getElementById("App").style.overflow = "hid";
              }}
            >
              <BsPencilSquare size={"40px"} color={"#dad7cd"} />
              <li>Parlar</li>
            </div> */}
            <div
              id="btnPerfil"
              onClick={() => {
                setPerfil(true);
                // document.getElementById("App").style.overflow = "hid";
              }}
            >
              <MdOutlinePerson size={"40px"} color={"#dad7cd"} />
              <li>Perfil</li>
            </div>
            <div id="btnSair" onClick={handleLogout}>
              <RxExit size={"40px"} color={"#dad7cd"} />
              <li>Sair</li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Feed;
