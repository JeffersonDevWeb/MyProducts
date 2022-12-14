import styled from 'styled-components';

export default styled.select`
  width: 100%;
  height: 52px;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: all 0.2s ease-in;

  &:focus{
    border: 2px solid ${({ theme }) => theme.colors.primary.main}
  }
`;
