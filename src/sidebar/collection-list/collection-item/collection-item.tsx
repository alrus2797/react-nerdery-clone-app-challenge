import styled from 'styled-components';
import { PlaylistIcon } from '../styles';
import { DEFAULT_SONG_URL } from '../../../shared/constants/app';
import { LibraryItem } from '../../../shared/types/library-item';

const CollectionItemContainer = styled.div`
  display: flex;
  padding: 8px;
  color: var(--base);
  cursor: pointer;
  gap: 8px;
  width: 100%;
  border-radius: 4px;

  &:hover {
    background-color: #1a1a1a;
  }
`;

const CollectionItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  word-break: break-all;
  outline: none;
  font-weight: 400;
  text-overflow: ellipsis;
  text-decoration: none;
  p {
    overflow: hidden;
    font-size: 1rem;
  }

  span {
    overflow: hidden;
    font-size: 0.875rem;
    color: var(--sub);
    text-transform: capitalize;
  }
`;

export const AuthCollectionItem = ({ entity }: LibraryItem) => {
  // console.log(entity);

  return (
    <CollectionItemContainer>
      <PlaylistIcon size={48} borderRadius={4}>
        <img width="100%" height="100%" src={DEFAULT_SONG_URL.url} alt="" />
      </PlaylistIcon>
      <CollectionItemDetails>
        <p>{entity.name}</p>
        <span>{entity.type}</span>
      </CollectionItemDetails>
    </CollectionItemContainer>
  );
};
