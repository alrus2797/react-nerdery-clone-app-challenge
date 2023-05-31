import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { LeftArrowIcon, RightArrowIcon } from '../assets/icons';
import { Box, Flex } from '../shared/ui/flex';

import {
  HeaderWrapper,
  HistoryButtonContainer,
  LoginButton,
  RegisterButton,
  StyledHeader,
} from './styles';
import { SearchInput } from './search-input';
import { SEARCH_ROUTE } from '../shared/constants/router';

import { useAuth } from '../hooks/useAuth';
import { ThemeButton } from '../shared/ui/button';

const isInSearchView = (pathname: string) =>
  matchPath(`${SEARCH_ROUTE}/*`, pathname);

export const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { auth, isLogged, logout } = useAuth();

  return (
    <HeaderWrapper>
      <StyledHeader>
        <Flex direction="row" gap="8px">
          <HistoryButtonContainer disabled>
            <LeftArrowIcon />
          </HistoryButtonContainer>

          <HistoryButtonContainer>
            <RightArrowIcon />
          </HistoryButtonContainer>
        </Flex>
        {isInSearchView(pathname) ? <SearchInput /> : null}

        {!isLogged ? (
          <div>
            <RegisterButton onClick={() => navigate('/signup')}>
              Sign up
            </RegisterButton>
            <LoginButton onClick={() => navigate('/login')}>
              <span>Log in</span>
            </LoginButton>
          </div>
        ) : (
          <Flex align="center">
            <h4>Name: {auth?.user.username}</h4>
            <Box margin="0px 0px 0px 10px">
              <ThemeButton onClick={logout}>Logout</ThemeButton>
            </Box>
          </Flex>
        )}
      </StyledHeader>
    </HeaderWrapper>
  );
};
