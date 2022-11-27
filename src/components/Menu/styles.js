import styled from 'styled-components';

export const Overlay = styled.div`
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
`;

export const Container = styled.div`
  width: 90%;
  max-width: 450px;
  height: 20%;
  background: #fff;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    h1 {
    font-size: 22px;
    color: ${({ theme }) => (theme.colors.primary.main)}
  }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }
  }

  .menu-options {
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0;
    border-radius: 4px;
    background: transparent;
    line-height: 0;
    padding: 0px 8px;
    text-decoration: none;
    color: black;

    p {
      font-size: 14px;
    }

    &:hover {
      background-color: ${({ theme }) => (theme.colors.gray[100])};
      color: white;
      font-weight: bold;
    }

    .menu-link {
      text-decoration: none;
      color: black;
    }
  }
`;
