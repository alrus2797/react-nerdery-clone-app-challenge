import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { HomeView } from './home-view';
import { SearchView } from './search-view/search-view';
import { Header } from '../header';
import { useState } from 'react';
import { SEARCH_ROUTE } from '../shared/constants/router';

const MainDiv = styled.div`
  grid-area: main-view;
  background-color: var(--main-base-color);
  overflow-y: scroll;

  .header-spacer {
    height: 64px;
  }
`;

function MainView() {
  const [searched, setSearched] = useState('');
  return (
    <>
      <Header setSearched={setSearched} />
      <MainDiv>
        <div className="header-spacer" />
        <Routes>
          <Route index element={<HomeView />} />
          <Route
            path={SEARCH_ROUTE}
            element={<SearchView searchedText={searched} />}
          />
          <Route path="login" element={<div>Login</div>} />
        </Routes>
      </MainDiv>
    </>
  );
}

export { MainView };
