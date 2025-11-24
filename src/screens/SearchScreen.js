import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import ProductCard from '../components/ProductCard';
import FurnitureAPI from '../services/api';
import { transformApiProduct, debounce } from '../utils/helpers';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Debounced search function
  const performSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setSearched(false);
        return;
      }

      try {
        setLoading(true);
        const response = await FurnitureAPI.searchProducts(searchQuery, {
          limit: 20,
        });

        if (response.success && response.data) {
          const transformedProducts = response.data.map(transformApiProduct);
          setResults(transformedProducts);
        } else {
          setResults([]);
        }
        setSearched(true);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
        setSearched(true);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  const handleQueryChange = (text) => {
    setQuery(text);
    performSearch(text);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  const renderEmpty = () => {
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      );
    }

    if (searched && results.length === 0) {
      return (
        <View style={styles.centerContainer}>
          <Icon name="magnify-close" size={64} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No results found</Text>
          <Text style={styles.emptyText}>
            Try searching with different keywords
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.centerContainer}>
        <Icon name="magnify" size={64} color={colors.textLight} />
        <Text style={styles.emptyTitle}>Search for furniture</Text>
        <Text style={styles.emptyText}>
          Find chairs, tables, sofas, and more
        </Text>
        
        {/* Quick Search Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Popular Searches</Text>
          {['chair', 'sofa', 'table', 'lamp'].map((suggestion) => (
            <TouchableOpacity
              key={suggestion}
              style={styles.suggestionItem}
              onPress={() => handleQueryChange(suggestion)}
            >
              <Icon name="magnify" size={18} color={colors.textSecondary} />
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        
        <View style={styles.searchBar}>
          <Icon name="magnify" size={22} color={colors.textSecondary} />
          <TextInput
            style={styles.input}
            placeholder="Search furniture..."
            value={query}
            onChangeText={handleQueryChange}
            autoFocus
            returnKeyType="search"
            placeholderTextColor={colors.textLight}
          />
          {!!query && (
            <TouchableOpacity onPress={handleClear}>
              <Icon name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results Count */}
      {searched && results.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            {results.length} {results.length === 1 ? 'result' : 'results'} found
          </Text>
        </View>
      )}

      {/* Results List */}
      <FlatList
        data={results}
        numColumns={2}
        contentContainerStyle={styles.results}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={(product) => navigation.navigate('ProductDetail', { product })}
            onFavoritePress={(id) => console.log('Favorite:', id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.white 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  input: { 
    flex: 1, 
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsCount: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  results: { 
    paddingHorizontal: 16, 
    paddingTop: 8,
    paddingBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  loadingText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 12,
  },
  emptyTitle: {
    ...typography.h3,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  suggestionsContainer: {
    width: '100%',
    marginTop: 32,
  },
  suggestionsTitle: {
    ...typography.bodyMedium,
    fontWeight: '600',
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.cream,
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    ...typography.bodyMedium,
    marginLeft: 12,
    textTransform: 'capitalize',
  },
});

export default SearchScreen;