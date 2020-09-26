import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {

  const[repositories, setRepositories] = useState([]);
  

  async function loadRepositories() {
    await api.get(`/repositories`).then( response => {
      console.log(response);
      setRepositories(response.data);
    });
  }
  
  useEffect( () => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {      
      url: "https://github.com/luizbrito",
      title: "Testes",
      techs: ["React", "Node.js"],
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    
    setRepositories(repositories.filter(repository => repository.id !== id));

  }

  return (
    <div>
      
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>
            {repo.title}   
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
      
    </div>
  );
}

export default App;
