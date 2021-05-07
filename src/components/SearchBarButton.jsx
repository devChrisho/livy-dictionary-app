import styled from 'styled-components';
import * as Icons from '@material-ui/icons';

const StyledSearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 4rem;

  outline: none;
  cursor: pointer;

  padding: 0 2rem;
  border-radius: 0 20px 20px 0;
  border: none;

  font-size: 1.6rem;

  color: var(--ncol150);
  background-image: linear-gradient(45deg, var(--col400), var(--col300));

  &:active {
    background-color: var(--col450);
  }
`;

const StyledFindIcon = styled(Icons.SearchRounded)`
  font-size: 2rem !important;
  margin-left: 1rem;
  color: var(--ncol150);
`;

const SearchBarButton = (props) => {
 
  return (
    <StyledSearchButton {...props}>
      {props.children}
      <StyledFindIcon />
    </StyledSearchButton>
  );
};

export default SearchBarButton;
