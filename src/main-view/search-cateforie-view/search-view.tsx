import styled from 'styled-components';
import { Heading2 } from '../../shared/ui/heading2';
import { Flex } from '../../shared/ui/flex';

export const SearchTitleContainer = styled.div`
  flex-grow: 1;
  min-width: 0;
`;

export const GenresContainer = styled.div`
  --default-size: 190px;
  width: 100%;
  display: grid;
  grid-gap: 18px;
  grid-template-columns: repeat(auto-fit, minmax(var(--default-size), 1fr));

  /* grid-auto-rows: auto; */
  /* grid-template-rows: 1fr; */
`;

export const CategorieCard = styled.div`
  background-color: gray;
  border: none;
  border-radius: 8px;
  width: 100%;
  /* min-width: 150px;
  
  max-width: 220px; */
  min-height: var(--default-size);
  max-height: var(--default-size);
`;

function SearchCategorieView() {
  return (
    <Flex direction="column" padding="15px 32px">
      <SearchTitleContainer>
        <Heading2>Explorar Todo</Heading2>
      </SearchTitleContainer>

      <GenresContainer>
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
        <CategorieCard />
      </GenresContainer>
    </Flex>
  );
}

export { SearchCategorieView };
