import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-self: center;
    align-items: center;

    h1 {
      color: #fff;
    }
  }

  table {
    margin: 20px 0 20px 0;

    td {
      color: #fff;
      background: #6c7ae0;
      padding: 18px 10px 18px 40px;
      font-size: 18px;
    }

    button {
      padding: 6px;
      opacity: 1;
    }

    button.detalhes {
      background: #ccc;
    }

    button.deletar {
      background: #f56;
    }
  }

  button {
    max-width: 200px;
    margin: 5px 0 0;
    height: 44px;
    background: #0f0;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    opacity: 0.75;

    &: hover {
      opacity: 1;
    }

    a {
      color: #fff;
    }
  }
`;
