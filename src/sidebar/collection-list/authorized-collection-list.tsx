import styled from 'styled-components';
import { ThemeButton } from '../../shared/ui/button';
import { Flex } from '../../shared/ui/flex';
import { AuthCollectionListContainer } from './styles';
import { useLibrary } from '../../hooks/useLibrary';
import { AuthCollectionItem } from './collection-item/collection-item';

const OnboardingButton = styled(ThemeButton)`
  span {
    font-size: 0.85rem;
    font-weight: 700;
    padding-inline: 10px;
    padding: 8px 15px;
    min-block-size: 0px;
  }
`;

export const AuthCollectionList = () => {
  const { addOwnPlaylist, libraryItems } = useLibrary();
  return (
    <AuthCollectionListContainer>
      <OnboardingButton onClick={() => addOwnPlaylist()}>
        <span>Create Playlist</span>
      </OnboardingButton>
      <Flex padding="0 8px 8px" width="100%">
        {libraryItems.length === 0 ? (
          <Flex
            background="var(--elevated-base)"
            padding="16px 20px"
            margin="8px 0"
            width="100%"
            borderRadius="8px"
            gap="20px"
          >
            <div>
              <div>Create your first Playlist</div>
              <span>It's easy, we'll help you</span>
            </div>
          </Flex>
        ) : (
          <Flex direction="column" width="100%" gap="5px">
            {libraryItems.map(item => (
              <AuthCollectionItem key={item.id} {...item} />
            ))}
          </Flex>
        )}
      </Flex>
    </AuthCollectionListContainer>
  );
};
