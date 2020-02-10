import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import history from '../../services/history';
import api from '../../services/api';

import { Container } from './styles';

const schema = Yup.object().shape({
  nome: Yup.string().required('Obrigatório'),
  cpf: Yup.string().required('Obrigatório'),
  cep: Yup.string().required('Obrigatório'),
  logradouro: Yup.string().required('Obrigatório'),
  bairro: Yup.string().required('Obrigatório'),
  cidade: Yup.number().required('Obrigatório'),
  uf: Yup.number().required('Obrigatório'),
  complemento: Yup.string(),
  tipo: Yup.string().required('Obrigatório'),
  telefones: Yup.array().required('Obrigatório'),
  emails: Yup.array().required('Obrigatório'),
});

export default function Create() {
  const [nome, setNome] = useState('');
  const [cpf, setCPF] = useState('');
  const [cep, setCEP] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [cidades, SelectCidade] = useState([]);
  const [uf, setUF] = useState('');
  const [estados, setEstados] = useState([]);
  const [complemento, setComplemento] = useState('');
  const [tipo, setTipo] = useState('CELULAR');
  const [telefones, setTelefones] = useState([]);
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function getEstados() {
      try {
        const res = await api.get('estados');
        setEstados(res.data);
      } catch (err) {
        toast.error('Não conseguiu carregar os Estados!');
      }
    }
    getEstados();
  }, []);

  useEffect(() => {
    async function getCidades() {
      try {
        const res = await api.get('cidades');
        SelectCidade(res.data);
      } catch (err) {
        toast.error('Não conseguiu carregar as Cidades!');
      }
    }
    getCidades();
  }, []);

  async function cadastrarEmail(id) {
    await api
      .post('emails', {
        email: emails[0],
        cliente: {
          id,
        },
      })
      .then();
  }

  async function cadastrarTelefone(id) {
    await api
      .post('telefones', {
        tipo,
        numero: telefones[0],
        cliente: {
          id,
        },
      })
      .then(res => cadastrarEmail(res.data.cliente.id));
  }

  async function cadastrarCliente(id) {
    await api
      .post('clientes', {
        nome,
        cpf,
        endereco: {
          id,
        },
      })
      .then(res => cadastrarTelefone(res.data.id));
  }

  async function cadastrarEndereco() {
    await api
      .post('enderecos', {
        cep,
        logradouro,
        bairro,
        cidade: {
          id: cidade,
          estado: {
            id: uf,
          },
        },
      })
      .then(res => cadastrarCliente(res.data.id));
  }

  async function handleCadastrarCliente(event) {
    event.preventDefault();

    try {
      cadastrarEndereco();
      history.push('/');
      toast.done('Cadastro realizado com sucesso!');
    } catch (err) {
      toast.error('Não conseguiu cadastrar!');
    }
  }

  return (
    <Container>
      <form schema={schema} onSubmit={handleCadastrarCliente}>
        <h1>Cadastro de Clientes</h1>
        <label>Nome: </label>
        <input
          type="text"
          name="nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Seu nome"
        />
        <label>CPF: </label>
        <input
          type="text"
          name="cpf"
          value={cpf}
          onChange={e => setCPF(e.target.value)}
          placeholder="Somente números"
        />
        <h1>Endereço: </h1>
        <label>CEP: </label>
        <input
          type="text"
          name="cep"
          value={cep}
          onChange={e => setCEP(e.target.value)}
          placeholder="Somente números"
        />
        <label>Logradouro: </label>
        <input
          type="text"
          name="logradouro"
          value={logradouro}
          onChange={e => setLogradouro(e.target.value)}
          placeholder="Rua Dom Pedro II"
        />
        <label>Bairro: </label>
        <input
          type="text"
          name="bairro"
          value={bairro}
          onChange={e => setBairro(e.target.value)}
          placeholder="Centro"
        />
        <label>Cidade:</label>
        <select value={cidade} onChange={e => setCidade(e.target.value)}>
          {cidades.map(city => (
            <option value={city.id} key={city.id}>
              {city.nome}
            </option>
          ))}
        </select>
        <label>Estado:</label>
        <select value={uf} onChange={e => setUF(e.target.value)}>
          {estados.map(estado => (
            <option value={estado.id} key={estado.id}>
              {estado.nome}
            </option>
          ))}
        </select>
        <label>Complemento: </label>
        <input
          type="text"
          name="complemento"
          value={complemento}
          onChange={e => setComplemento(e.target.value)}
        />
        <h1>Contato: </h1>
        <label>Tipo:</label>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="CELULAR">CELULAR</option>
          <option value="RESIDENCIAL">RESIDENCIAL</option>
          <option value="COMERCIAL">COMERCIAL</option>
        </select>
        <label>Telefone: </label>
        <input
          type="text"
          name="telefone"
          value={telefones}
          onChange={e => setTelefones([e.target.value])}
          placeholder="(00) 98888 - 9999"
        />
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={emails}
          onChange={e => setEmails([e.target.value])}
          placeholder="seuemail@email.com"
        />
        <button type="submit">Cadastrar</button>
      </form>
    </Container>
  );
}
