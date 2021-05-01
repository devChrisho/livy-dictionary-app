import styled from 'styled-components';

const StyledSearchBar = styled.input`
  width: 50%;
  height: 4rem;

  border-radius: 20px 0 0 20px;
  border: none;
  outline: none;

  font-size: 1.6rem;
  text-align: center;
  color: var(--ncol150);

  background-color: rgba(255, 255, 255, 0.551);

  transition: all 0.5s ease;

  &:focus {
    width: 100%;
    background-color: rgb(247, 247, 247);
  }
  @media screen and (min-width: 600px) {
    width: 25%;
    &:focus {
      width: 50%;
    }
  }
`;

const SearchBar = ({ ...props }) => {
  return <StyledSearchBar {...props} />;
};

export default SearchBar;
