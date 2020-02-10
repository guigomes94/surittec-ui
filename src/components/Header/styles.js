import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 32px;
  }

  button {
    font-size: 28px;
    background: #f00;
    border: none;
    color: #fff;
    padding: 4px;
  }
`;
