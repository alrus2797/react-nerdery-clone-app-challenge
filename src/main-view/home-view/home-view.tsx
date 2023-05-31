import { Flex } from '../../shared/ui/flex';
import { useAsync } from '../../hooks/useAsync';
import { getSections } from '../../services/http-spotify-api';
import { StyledShelf } from './shelf';
import { HomeDiv, LightDiv, StyledMain } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { useMemo } from 'react';

function HomeView() {
  const { auth, isLogged } = useAuth();
  const { value: sections } = useAsync(useMemo(() => getSections, []));

  return (
    <HomeDiv>
      <StyledMain>
        <LightDiv style={{ backgroundColor: 'rgb(83, 83, 83)' }} />
        <Flex
          padding="24px var(--content-spacing) 0px;"
          direction="row"
          wrap="wrap"
          gap="24px"
        >
          {isLogged ? (
            <code style={{ color: 'white', zIndex: 1 }}>
              {JSON.stringify(auth?.user)}
            </code>
          ) : null}
          {sections?.map(section => (
            <StyledShelf
              key={section.id}
              uri={section.uri}
              title={section.title}
              shelfLink={section.uri}
              items={section.items}
            />
          ))}
        </Flex>
      </StyledMain>
    </HomeDiv>
  );
}

export { HomeView };
