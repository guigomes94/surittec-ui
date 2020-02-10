import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import { Container } from './styles';

export default function Detalhes({ match }) {
  const [cliente, setCliente] = useState({});
  const [telefones, setTelefones] = useState([]);
  const [emails, setEmails] = useState([]);
  const [endereco, setEndereco] = useState({});
  const [cidade, setCidade] = useState({});
  const [estado, setEstado] = useState({});

  useEffect(() => {
    api.get(`clientes/${match.params.id}`).then(res => {
      setCliente(res.data);
      setEndereco(res.data.endereco);
      setCidade(res.data.endereco.cidade);
      setEstado(res.data.endereco.cidade.estado);
    });
  }, [match.params.id]);

  useEffect(() => {
    api.get(`/clientes/${match.params.id}/telefones`).then(res => {
      setTelefones(res.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    api.get(`/clientes/${match.params.id}/emails`).then(res => {
      setEmails(res.data);
    });
  }, [match.params.id]);

  return (
    <Container>
      <article key={cliente.id}>
        <h2>{cliente.nome}</h2>
        <ul>
          <li>CPF: {cliente.cpf}</li>
          <li>
            Endereço: {endereco.logradouro}, {endereco.bairro} - {endereco.cep}
          </li>
          <li>
            {cidade.nome}/{estado.uf}
          </li>
          <h2> - Telefones - </h2>
          {telefones.map(tel => (
            <li key={tel.id}>
              {tel.tipo}: {tel.numero}
            </li>
          ))}
          <h2> - Emails - </h2>
          {emails.map(email => (
            <li key={email.id}> {email.email}</li>
          ))}
        </ul>
      </article>
      <button type="button">
        <Link to="/dashboard">Voltar</Link>
      </button>
    </Container>
  );
}
