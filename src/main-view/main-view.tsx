import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { HomeView } from './home-view';
import { SearchCategorieView } from './search-categorie-view/search-view';
import { Header } from '../header';
import { SEARCH_ROUTE } from '../shared/constants/router';
import { SearchResultsView } from './search-categorie-view/search-results-view';

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
          <Route path="login" element={<div>Login</div>} />
        </Routes>
      </MainDiv>
    </>
  );
}

export { MainView };
