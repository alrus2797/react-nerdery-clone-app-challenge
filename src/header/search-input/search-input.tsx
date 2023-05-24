import styled from 'styled-components';
import { SearchIcon } from '../../assets/icons';
import { Flex } from '../../shared/ui/flex';
import { ChangeEvent, useEffect, useState } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router';

import {
  SEARCH_RESULT_ROUTE,
  SEARCH_ROUTE,
} from '../../shared/constants/router';
import { debounce } from 'lodash';

const SearchContainer = styled.div`
  flex: 0 1 364px;
  position: relative;
`;

const TextField = styled.input`
  border: 0;
  border-radius: 500px;
  color: #000;
  height: 40px;
  padding: 6px 48px;
  text-overflow: ellipsis;
  width: 100%;
`;

const IconSpan = styled.span`
  flex: 1 1 0%;
  color: var(--base);
`;

export function SearchInput() {
  const [searched, setSearched] = useState('');
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearched(text);
  };

  const debouncedHandler = debounce(textHandler, 300);

  useEffect(() => {
    const match = matchPath(SEARCH_RESULT_ROUTE, pathname);

    if (match?.params.text) setSearched(match.params.text);
  }, [pathname]);

  useEffect(() => {
    const redirectString = `${SEARCH_ROUTE}/${encodeURIComponent(searched)}`;
    navigate(redirectString, {
      replace: true,
    });
  }, [searched, navigate]);

  return (
    <Flex
      style={{
        flexGrow: 1,
      }}
      align="center"
    >
      <SearchContainer>
        <form role="search">
          <TextField
            maxLength={800}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="¿Qué te apetece escuchar?"
            onChange={debouncedHandler}
            style={{ color: 'rgb(0, 0, 0)' }}
          />
        </form>
        <Flex
          align="center"
          style={{
            position: 'absolute',
            right: '12px',
            left: '12px',
            bottom: '0',
            top: '8px',
            pointerEvents: 'none',
          }}
        >
          <IconSpan>
            <SearchIcon />
          </IconSpan>
        </Flex>
      </SearchContainer>
    </Flex>
  );
}
