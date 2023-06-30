import React from "react";
import { BsTrash } from "react-icons/bs";
import useFetch from "use-http";

import "./css/Posts.css";

// import { MdStar } from "react-icons/md";

const SinglePost = (props) => {
  const { del } = useFetch("https://parlaapi.roddgarcia.repl.co/posts");
  const {
    usuario,
    texto,
    // likes,
    dia_criado,
    cod_post,
    dataCriada,
    // usuario: { nome, email },
  } = props.data;

  const apagar = async (e) => {
    await del("/" + e.cod_post).then(() => alert("Item eliminado"));
    props.getDados();
    // .then(() => window.location.reload(false));
  };

  const checkUsersPhoto = () => {
    return usuario.photo === null ? "./imgs/default.png" : usuario.photo;
  };

  return (
    <>
      <div id="post">
        <div id="content">
          <img
            src={checkUsersPhoto()}
            alt="User's Profile Pic"
            id="userPhoto"
          />
          <div id="textContent">
            <div id="userName">
              <h3>{usuario.nome}</h3>
              {/* {verificado ? <MdVerified color="#2F2FFF" /> : null} */}
              {/* <h4>@{usuario.nome}</h4>  */}({dia_criado})
            </div>
            <p id="userTxt">{texto}</p>
            {/* <img id="postImage" src={image} /> */}
          </div>
        </div>
        {/* <hr></hr> */}
        <div class="userInt">
          {/* <div id="postComments">
            {cm}
            <MdComment />
  </div>*/}
          <div id="postFavorite">
            {/* <div id="postFavs">
              {likes}
              <MdStar />
            </div> */}
            {props.data.usuario.cod_usuario === props.user.cod_usuario ? (
              <BsTrash
                onClick={() => {
                  apagar({ cod_post });
                }}
              />
            ) : (
              " "
            )}
            ({dataCriada})
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default SinglePost;
