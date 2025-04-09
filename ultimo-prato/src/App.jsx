
import React, { useEffect, useState } from 'react';
import ComidaCard from './components/ComidaCard'; // Componente que exibe a comida
import './App.css'; // Estilo principal 

function App() {
  // Estado que armazena a comida atual
  const [comida, setComida] = useState(null);
  // Estado que controla a exibição do modal inicial
  const [showModal, setShowModal] = useState(true);

  // Função para buscar uma comida aleatória da API
  const buscarComida = async () => {
    try {
      const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await res.json();
      setComida(data.meals[0]); // Armazena a comida 
    } catch (error) {
      console.error('Erro ao buscar comida:', error);
    }
  };

  // Busca uma comida 
  useEffect(() => {
    buscarComida();
  }, []);

  // Função chamada ao clicar em "Começar" no modal
  const iniciarJogo = () => {
    setShowModal(false); // Fecha o modal
  };

  return (
    <div className="app-container">
      {/* Exibe o modal se ainda não começou o jogo */}
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <h2>💀 É o fim do mundo!</h2>
            <p>Escolha sua última refeição com sabedoria...</p>
            <button onClick={iniciarJogo}>Começar</button>
          </div>
        </div>
      ) : comida ? (
        // Exibe o componente de comida se já tiver uma comida carregada
        <ComidaCard comida={comida} proximaComida={buscarComida} />
      ) : (
        // Mensagem de carregamento
        <p style={{ color: 'white' }}>Carregando comida...</p>
      )}
    </div>
  );
}

export default App;