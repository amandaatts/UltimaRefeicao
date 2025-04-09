// ComidaCard.jsx - Componente que exibe a comida e lida com interações
import React, { useState } from "react";
import "./ComidaCard.css"; // Estilos do card de comida
import prato from "../assets/prato.png"; // Imagem do prato
import gifSonicMal from "../assets/sonic-mal.gif"; // GIF do Sonic mal
import grito from "../assets/grito.mp3"; // Som de susto

function ComidaCard({ comida, proximaComida }) {
  // Estado que indica se a comida está estragada
  const [comidaEstragada, setComidaEstragada] = useState(false);

  // Função chamada quando o usuário "aceita" a comida
  const handleLike = () => {
    const chance = Math.random();
    // 35% de chance da comida estar estragada
    if (chance <= 0.35) {
      setComidaEstragada(true);

      // Toca o áudio do grito
      const audio = new Audio(grito);
      audio.play();

      // Após 6 segundos, para o som e avança para próxima comida
      setTimeout(() => {
        audio.pause();
        audio.currentTime = 0;
        setComidaEstragada(false);
        proximaComida();
      }, 6000);
    } else {
      // Se não estiver estragada, passa pra próxima comida
      proximaComida();
    }
  };

  // Função chamada ao rejeitar a comida
  const handleDislike = () => {
    proximaComida();
  };

  return (
    <div className="comida-card">
      <h1 className="titulo">Última refeição</h1>

      {comidaEstragada ? (
        // Caso a comida esteja estragada, mostra o gif e mensagem de morte
        <div className="comida-match">
          <p>☠️ A comida estava estragada e você morreu antes do fim do mundo!</p>
          <img
            src={gifSonicMal}
            alt="Comida estragada"
            className="gif-sonic"
          />
        </div>
      ) : (
        // Caso a comida esteja normal, exibe os dados normalmente
        <>
          <div className="imagem-comida-container">
            <img
              src={comida.strMealThumb}
              alt={comida.strMeal}
              className="imagem-comida"
            />
          </div>

          <div className="imagem-prato-container">
            <img src={prato} alt="Prato" className="imagem-prato" />
          </div>

          <div className="info">
            <h2>{comida.strMeal}</h2>
            <p>
              <strong>Categoria:</strong> {comida.strCategory}
            </p>
            <p>
              <strong>Origem:</strong> {comida.strArea}
            </p>
          </div>

          <div className="botoes">
            <button className="botao" onClick={handleDislike}>
              ❌
            </button>
            <button className="botao" onClick={handleLike}>
              ✔
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ComidaCard;
