import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { HomeView } from './home-view';
import { SearchCategorieView } from './search-categorie-view/search-view';
import { Header } from '../header';
import { SEARCH_ROUTE } from '../shared/constants/router';
import { SearchResultsView } from './search-categorie-view/search-results-view';
import { SearchResultsFilter } from './search-categorie-view/search-results-filter';

const MainDiv = styled.div`
  grid-area: main-view;
  background-color: var(--main-base-color);
  overflow-y: scroll;

  .header-spacer {
    height: 64px;
  }
`;

function MainView() {
  return (
    <>
      <Header />
      <MainDiv>
        <div className="header-spacer" />
        <Routes>
          <Route index element={<HomeView />} />
          <Route path={SEARCH_ROUTE} element={<SearchCategorieView />} />
          <Route
            path={`${SEARCH_ROUTE}/:text`}
            element={<SearchResultsView />}
          />
          <Route
            path={`${SEARCH_ROUTE}/:text/:filter`}
            element={<SearchResultsFilter />}
          />
          <Route
            path="*"
            element={
              <div>
                <h1>Route Not Found</h1>
              </div>
            }
          />
        </Routes>
      </MainDiv>
    </>
  );
}

export { MainView };
