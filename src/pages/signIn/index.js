import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { Content } from './styles';
import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  username: Yup.string().required('Login é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ username, password }) {
    dispatch(signInRequest(username, password));
  }

  return (
    <>
      <Content>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="username" type="text" placeholder="Login" />
          <Input name="password" type="password" placeholder="Senha" />

          <button type="submit">{loading ? 'Loading...' : 'Acess'}</button>
        </Form>
      </Content>
    </>
  );
}
