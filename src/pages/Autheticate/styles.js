import styled from 'styled-components';

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;

export const RegisterContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  text-align: center;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.light};
    transition: 0.4s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary.main};
      text-decoration: underline;
    }
  }
`;

export const passwordWrapper = styled.div`
`;
