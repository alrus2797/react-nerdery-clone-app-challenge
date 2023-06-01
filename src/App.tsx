import styled from 'styled-components';
import { DesktopLayout } from './desktop-layout';
import GlobalStyle from './globalStyles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './providers/auth-provider';
import { LoginView, SignupView } from './main-view/auth/';
import { setupInterceptors } from './interceptors';
import { LibraryProvider } from './providers/library-provider';

const MainDiv = styled.div`
  position: relative;
  isolation: isolate;
  width: 100%;
  z-index: 0;
  height: 100%;
  border: 0;
  margin: 0;
  padding: 0;
`;

const RootLayout = (
  <MainDiv>
    <LibraryProvider>
      <DesktopLayout />
    </LibraryProvider>
  </MainDiv>
);

setupInterceptors();

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="login" element={<LoginView />} />
          <Route path="signup" element={<SignupView />} />
          <Route path="/*" element={RootLayout} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
