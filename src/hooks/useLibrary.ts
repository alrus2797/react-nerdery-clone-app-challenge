import { useContext, useEffect } from 'react';
import { LibraryContext } from '../context/library-context';
import {
  addToLibrary,
  createPlaylist,
  editLibraryItem,
  getLibraryItems,
  removeFromLibrary,
} from '../services/http-spotify-api';
import { useAuth } from './useAuth';
import { AllSpotifyObjects } from '../shared/types/spotify-objects';
import { LibraryItem } from '../shared/types/library-item';

export const useLibrary = () => {
  const [library, setLibrary] = useContext(LibraryContext);
  const { auth } = useAuth();
  if (!auth) throw Error('Must be inside an AuthProvider');

  useEffect(() => {
    getLibraryItems(auth.user.id)
      .then(data => {
        setLibrary(data);
      })
      .catch(_ => {
        // eslint-disable-next-line no-alert
        alert('There was an error while fetching the items into library');
      });
  }, [auth.user.id, setLibrary]);

  const add = (entity: AllSpotifyObjects) => {
    addToLibrary({
      entity: entity,
      userId: auth.user.id,
    })
      .then(data => {
        setLibrary([data, ...library]);
      })
      .catch(_ => {
        // eslint-disable-next-line no-alert
        alert('There was an error while adding the item into library');
      });
  };

  const addOwnPlaylist = () => {
    createPlaylist(auth.user.id)
      .then(data => setLibrary([data, ...library]))
      .catch(_ => {
        // eslint-disable-next-line no-alert
        alert(
          'There was an error while creating your playlist. Please try again, later',
        );
      });
  };

  const edit = (payload: LibraryItem) => {
    editLibraryItem(payload).then(data => {
      setLibrary(
        library.map(item => {
          if (item.id === data.id) {
            return data;
          }
          return item;
        }),
      );
    });
  };

  const get = (id: number) => {
    return library.find(item => item.id === id);
  };

  const remove = (id: number) => {
    removeFromLibrary(id)
      .then(() => {
        setLibrary(library.filter(item => item.id !== id));
      })
      .catch(_ => {
        // eslint-disable-next-line no-alert
        alert('There was an error while removing the item into library');
      });
  };

  return { add, get, remove, libraryItems: library, addOwnPlaylist, edit };
};
