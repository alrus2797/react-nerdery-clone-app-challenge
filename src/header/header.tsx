import { matchPath, useLocation } from 'react-router-dom';
import { LeftArrowIcon, RightArrowIcon } from '../assets/icons';
import { Flex } from '../shared/ui/flex';

import {
  HeaderWrapper,
  HistoryButtonContainer,
  LoginButton,
  RegisterButton,
  StyledHeader,
} from './styles';
import { SearchInput } from './search-input';
import { SEARCH_ROUTE } from '../shared/constants/router';

const isInSearchView = (pathname: string) =>
  matchPath(`${SEARCH_ROUTE}/*`, pathname);

export const Header = () => {
  const { pathname } = useLocation();

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

        <div>
          <RegisterButton>Registrarse</RegisterButton>
          <LoginButton>
            <span>Iniciar Sesión</span>
          </LoginButton>
        </div>
      </StyledHeader>
    </HeaderWrapper>
  );
};
