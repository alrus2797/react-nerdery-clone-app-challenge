import { useLocation } from 'react-router';
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
import { setState } from '../shared/types/setState';
import { SEARCH_ROUTE } from '../shared/constants/router';

interface HeaderProps {
  setSearched: setState<string>;
}

const isInSearchView = (pathname: string) => pathname === SEARCH_ROUTE;

export const Header = ({ setSearched }: HeaderProps) => {
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
        {isInSearchView(pathname) ? (
          <SearchInput setSearched={setSearched} />
        ) : null}

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
