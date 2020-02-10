import { takeLatest, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';
import api from '../../../services/api';

import history from '../../../services/history';
import { signInSuccess, signFailure } from './actions';

async function getToken(username, password) {
  const data = await axios.request({
    method: 'POST',
    url: 'http://localhost:8080/oauth/token',
    headers: {
      Authorization: 'Basic YXBwLXJlYWN0OmNsaWVudGU=',
    },
    data: `username=${username}&password=${password}&grant_type=password`,
  });
  return data;
}

export function* signIn({ payload }) {
  try {
    const { username, password } = payload;

    api.defaults.headers.Authorization = 'Basic YXBwLXJlYWN0OmNsaWVudGU=';

    const response = yield getToken(username, password);

    const token = response.data.access_token;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token));
    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticação!');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
