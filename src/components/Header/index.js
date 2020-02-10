import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import { Container, Content } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <strong>SURITTEC</strong>
        <button type="button" onClick={handleSignOut}>
          LOGOUT
        </button>
      </Content>
    </Container>
  );
}
