interface SearchViewProps {
  searchedText: string;
}

function SearchView({ searchedText }: SearchViewProps) {
  return <div>Search: {searchedText}</div>;
}

export { SearchView };
