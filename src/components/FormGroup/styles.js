import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }
  position: relative;

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }

    img {
      position: absolute;
      top: 10%;
      right: 4%;
    }
`;
