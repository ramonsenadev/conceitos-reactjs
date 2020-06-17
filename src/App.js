import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories')
      .then(({ data }) => {
        setRepositories(data)
      })
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('/repositories', {
      title: `Project with ReactJS ${Date.now()}`,
      owner: 'Ramon Sena'
    })
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`)
    setRepositories(repositories.filter((repository) => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
