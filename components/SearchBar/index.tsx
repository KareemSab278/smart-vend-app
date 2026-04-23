import { Searchbar } from 'react-native-paper';

export { SearchBar };

type SearchBarProps = {
  query: string;
  onChangeQuery: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
};

const SearchBar = ({
  query,
  onChangeQuery,
  placeholder = 'Search items...',
  autoFocus = false,
}: SearchBarProps) => (
  <Searchbar
    style={styles.searchBar}
    placeholder={placeholder}
    onChangeText={onChangeQuery}
    value={query}
    autoFocus={autoFocus}
    clearIcon={query ? 'close' : 'magnify'}
    onIconPress={() => onChangeQuery('')}
  />
);


const styles = {
  searchBar: {
    backgroundColor: '#ffffff',
    marginTop: -30,
  },
};