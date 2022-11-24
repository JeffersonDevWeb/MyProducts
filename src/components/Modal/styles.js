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
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
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
    color: ${({ theme }) => (theme.colors.danger.main)}
  }

    button {
      border: 0;
      background: transparent;
      line-height: 0;
    }
  }

  p {
    margin-bottom: 12px;
  }

  input:focus {
    border-color: ${({ theme }) => (theme.colors.danger.main)};
  }

  .delete-Button {
    background-color: ${({ theme }) => (theme.colors.danger.main)};

    &:hover {
      background-color: ${({ theme }) => (theme.colors.danger.dark)};
    }
  }
`;

export const Footer = styled.footer`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .cancel-Button {
    background: transparent;
    border: none;
    font-size: 16px;
    margin-right: 8px;
    color: ${({ theme }) => theme.colors.gray[200]};
  }
`;
