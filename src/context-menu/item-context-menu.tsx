import { useLibrary } from '../hooks/useLibrary';
import { SpotifyEntityType } from '../shared/types/spotify-entities';
import { AllSpotifyObjects } from '../shared/types/spotify-objects';
import { ButtonContainer, StyledMenu } from './styles';
import { ContextMenuProps } from './types';

const permitedTypes = ['playlist', 'album', 'show', 'track'];

export const ItemContextMenu = ({
  positionX,
  positionY,
  isToggled,
  menuRef,
  targetedItem,
}: Omit<ContextMenuProps<AllSpotifyObjects>, 'buttons'>) => {
  const { add, ownPlaylists, addToPlaylist, addToFavorites } = useLibrary();

  return (
    <StyledMenu
      left={positionX}
      top={positionY}
      visible={isToggled}
      ref={menuRef}
      className={isToggled ? 'active' : ''}
    >
      {targetedItem && permitedTypes.includes(targetedItem.type) ? (
        <>
          {targetedItem.type === SpotifyEntityType.TRACK ? (
            <>
              <button onClick={() => addToFavorites(targetedItem)}>
                Add to liked songs
              </button>
              {ownPlaylists.length > 0 ? (
                <>
                  <span> Add to playlist:</span>
                  <ButtonContainer>
                    {ownPlaylists.map((item, idx) => (
                      <button
                        onClick={() => addToPlaylist(targetedItem, item.id)}
                        key={idx}
                      >
                        Add to {item.entity.name}
                      </button>
                    ))}
                  </ButtonContainer>
                </>
              ) : (
                <p>Create a new playlist to add a song there </p>
              )}
            </>
          ) : (
            <button onClick={() => add(targetedItem)}> Add to library</button>
          )}
        </>
      ) : (
        <span>No actions available</span>
      )}
    </StyledMenu>
  );
};
