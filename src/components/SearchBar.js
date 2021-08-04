import * as React from 'react';
import { Searchbar as SBar } from 'react-native-paper';
import { useTranslation } from '@composables/useTranslation';

export default function Searchbar() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const { translations } = useTranslation();
  const onChangeSearch = query => setSearchQuery(query);

  return (
    <SBar
      style={{ margin: 10, borderRadius: 25 }}
      placeholder={translations['search']}
      onChangeText={onChangeSearch}
      value={searchQuery}
    />
  );
}
