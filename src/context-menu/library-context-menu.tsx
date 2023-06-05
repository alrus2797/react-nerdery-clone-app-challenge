import { useLibrary } from '../hooks/useLibrary';
import { LibraryItem } from '../shared/types/library-item';
import { StyledMenu } from './styles';
import { ContextMenuProps } from './types';

interface LibraryContextMenuProps
  extends Omit<ContextMenuProps<LibraryItem>, 'buttons'> {
  editAction: (id: number) => void;
}

export const LibraryContextMenu = ({
  positionX,
  positionY,
  isToggled,
  menuRef,
  targetedItem,
  editAction,
}: LibraryContextMenuProps) => {
  const { addOwnPlaylist, remove } = useLibrary();
  return (
    <StyledMenu
      left={positionX}
      top={positionY}
      visible={isToggled}
      ref={menuRef}
      className={isToggled ? 'active' : ''}
    >
      <button onClick={addOwnPlaylist}> Create new Playlist </button>
      {targetedItem && targetedItem.entity.type === 'ownPlaylist' ? (
        <>
          <button onClick={() => editAction(targetedItem.id)}> Edit </button>
          <button onClick={() => remove(targetedItem.id)}> Remove </button>
        </>
      ) : null}
    </StyledMenu>
  );
};
