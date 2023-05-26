import { useParams } from 'react-router';
import { useAsync } from '../../hooks/useAsync';
import { searchAll } from '../../services/http-spotify-api';
import { StyledShelf } from '../home-view/shelf';
import { Flex } from '../../shared/ui/flex';

export const SearchResultsFilter = () => {
  const { text, filter } = useParams();

  const { value: searchSections, pending } = useAsync(
    searchAll,
    `${text}?type=${filter}`,
  );

  return (
    <Flex direction="column" margin="20px">
      <div>Searched Text: {text}</div>
      {pending ? (
        <div>Loading...</div>
      ) : (
        searchSections &&
        searchSections.map(section =>
          section.items.length > 0 ? (
            <StyledShelf
              key={section.uri}
              title={section.title}
              items={section.items}
            />
          ) : null,
        )
      )}
    </Flex>
  );
};
