import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container } from './styles';

export default function Dashboard() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    async function loadClientes() {
      await api.get('clientes').then(res => {
        setClientes(res.data);
      });
    }
    loadClientes();
  }, []);

  const deletarCliente = id => {
    api.delete(`clientes/${id}`);
    const res = clientes.filter(cliente => cliente.id !== id);
    setClientes(res);
  };

  return (
    <Container>
      <header>
        <h1>Clientes</h1>
      </header>
      <table>
        <tbody>
          {clientes.map(cliente => (
            <tr key={cliente.id}>
              <td>{cliente.nome}</td>
              <td>{cliente.cpf}</td>
              <td>
                <button className="detalhes" type="button">
                  <Link to={`/detalhes/${cliente.id}`}>Detalhes</Link>
                </button>
              </td>
              <td>
                <button
                  className="deletar"
                  onClick={() => deletarCliente(cliente.id)}
                  type="button"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button">
        <Link to="/create">Adicionar novo cliente</Link>
      </button>
    </Container>
  );
}
