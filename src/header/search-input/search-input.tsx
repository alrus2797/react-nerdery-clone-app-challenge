import styled from 'styled-components';
import { SearchIcon } from '../../assets/icons';
import { Flex } from '../../shared/ui/flex';
import { FormEvent, useState } from 'react';
import { setState } from '../../shared/types/setState';

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

interface setSearched {
  setSearched: setState<string>;
}

export function SearchInput({ setSearched }: setSearched) {
  const [text, setText] = useState('');

  const textHandler = (e: FormEvent<HTMLInputElement>) => {
    setSearched(e.currentTarget.value);
    setText(e.currentTarget.value);
  };

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
            value={text}
            onChange={textHandler}
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
