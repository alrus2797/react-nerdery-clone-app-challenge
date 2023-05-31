import { useParams } from 'react-router';
import { useAsync } from '../../hooks/useAsync';
import { searchAll } from '../../services/http-spotify-api';
import { StyledShelf } from '../home-view/shelf';
import { Flex } from '../../shared/ui/flex';
import { TagGroup } from '../../shared/ui/tag-group';
import { useNavigate } from 'react-router-dom';
import { getTagsSearchFilters } from './utils';
import { useEffect } from 'react';
import { SEARCH_ROUTE } from '../../shared/constants/router';

export const SearchResultsFilter = () => {
  const { text, filter } = useParams();
  const navigate = useNavigate();

  const searchFilterQuery = `${text}?type=${filter}`;
  const {
    value: searchSections,
    pending,
    reSync,
  } = useAsync(searchAll, searchFilterQuery);

  useEffect(() => {
    reSync(searchFilterQuery);
  }, [reSync, searchFilterQuery]);

  return (
    <Flex direction="column" margin="20px">
      <TagGroup
        items={getTagsSearchFilters}
        action={item => navigate(`${SEARCH_ROUTE}/${text}/${item}`)}
        selected={filter ?? ''}
      />
      <div>Searched Text: {text}</div>
      <div>Filter: {filter}</div>
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
