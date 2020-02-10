import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  article {
    width: 600px;
    padding: 20px;
    text-align: center;
    color: #fff;
    background: #6c7ae0;

    li {
      font-size: 18px;
    }
  }

  button {
    margin-top: 10px;
    padding: 6px;
    height: 44px;
    width: 100px;
    background: #ccc;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    font-size: 16px;

    a {
      color: #fff;
    }
  }
`;
