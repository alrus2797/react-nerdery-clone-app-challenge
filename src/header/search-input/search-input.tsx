import styled from 'styled-components';
import { SearchIcon } from '../../assets/icons';
import { Flex } from '../../shared/ui/flex';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

import { SEARCH_ROUTE } from '../../shared/constants/router';
import { debounce } from 'lodash';
import { InputChangeEvent } from '../../shared/types/input-change-event';
import { useParams } from 'react-router-dom';

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

const HANDLER_MS_WAIT = 300;

const handleExtraParam = (extraParam: string | undefined) => {
  if (extraParam) return `/${extraParam}`;
  return '';
};

export function SearchInput() {
  const navigate = useNavigate();

  const inputRef = useRef() as RefObject<HTMLInputElement>;

  const { text: textParams, filter } = useParams();

  const [searched, setSearched] = useState(textParams || '');
  const extraParam = handleExtraParam(filter);

  const textHandler = (e: InputChangeEvent) => {
    const text = e.target.value;
    setSearched(encodeURIComponent(text));
  };

  const debouncedHandler = debounce(textHandler, HANDLER_MS_WAIT);

  useEffect(() => {
    if (textParams) {
      if (inputRef && inputRef.current) {
        inputRef.current.value = decodeURIComponent(textParams);
      }
      setSearched(textParams);
    }
  }, [textParams]);

  useEffect(() => {
    const redirectString = `${SEARCH_ROUTE}/${encodeURIComponent(
      searched,
    )}${extraParam}`;

    navigate(redirectString, {
      replace: false,
    });
  }, [searched, navigate, extraParam]);

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
            ref={inputRef}
            maxLength={800}
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="What do you listen to?"
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
