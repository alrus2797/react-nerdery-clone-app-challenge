import { useParams } from 'react-router';

export const SearchResultsView = () => {
  const { text } = useParams();

  return <div>Searched Text: {text}</div>;
};
