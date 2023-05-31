import styled from 'styled-components';
import { ThemeButton } from '../../shared/ui/button';
import { Flex } from '../../shared/ui/flex';
import { AuthCollectionListContainer } from './styles';

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
  return (
    <AuthCollectionListContainer>
      <Flex padding="0 8px 8px" width="100%">
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

            <OnboardingButton>
              <span>Create Playlist</span>
            </OnboardingButton>
          </div>
        </Flex>
      </Flex>
    </AuthCollectionListContainer>
  );
};
