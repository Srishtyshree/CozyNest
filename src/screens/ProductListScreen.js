import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import ProductCard from '../components/ProductCard';
import FurnitureAPI from '../services/api';
import { transformApiProduct } from '../utils/helpers';

const ProductListScreen = ({ route, navigation }) => {
  const { 
    category, 
    apiCategory, 
    title, 
    filterParams,
    preloadedProducts 
  } = route.params || {};
  
  const [products, setProducts] = useState(preloadedProducts || []);
  const [loading, setLoading] = useState(!preloadedProducts);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  useEffect(() => {
    if (!preloadedProducts) {
      fetchProducts();
    }
  }, [apiCategory, filterParams]);

  const fetchProducts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
        setOffset(0);
      } else {
        setLoading(true);
      }
      
      setError(null);

      const params = {
        limit: LIMIT,
        offset: isRefresh ? 0 : offset,
        ...(apiCategory && { category: apiCategory }),
        ...filterParams,
      };

      const response = await FurnitureAPI.getProducts(params);

      if (response.success && response.data) {
        const transformedProducts = response.data.map(transformApiProduct);
        
        if (isRefresh) {
          setProducts(transformedProducts);
          setOffset(LIMIT);
        } else {
          setProducts(prev => offset === 0 ? transformedProducts : [...prev, ...transformedProducts]);
          setOffset(prev => prev + LIMIT);
        }
        
        setHasMore(transformedProducts.length === LIMIT);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchProducts();
    }
  };

  const handleRefresh = () => {
    fetchProducts(true);
  };

  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  };

  const renderEmpty = () => {
    if (loading) return null;

    return (
      <View style={styles.empty}>
        <Icon name="package-variant" size={64} color={colors.textLight} />
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptySubtitle}>
          Try adjusting your filters or browse other categories
        </Text>
        <TouchableOpacity 
          style={styles.browseButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.browseButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const screenTitle = title || category?.name || 'Products';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{screenTitle}</Text>
          <Text style={styles.count}>
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-variant" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={48} color={colors.error} />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => fetchProducts(true)}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={(product) => navigation.navigate('ProductDetail', { product })}
              onFavoritePress={(id) => console.log('Favorite:', id)}
            />
          )}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  headerContent: {
    flex: 1,
  },
  title: { 
    ...typography.h3 
  },
  count: { 
    ...typography.bodySmall, 
    color: colors.textSecondary, 
    marginTop: 2,
  },
  filterButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  list: { 
    paddingHorizontal: 16, 
    paddingTop: 16,
    paddingBottom: 24,
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  empty: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyTitle: { 
    ...typography.h4, 
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: { 
    ...typography.bodyMedium, 
    color: colors.textSecondary, 
    textAlign: 'center',
    marginBottom: 24,
  },
  browseButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  browseButtonText: {
    ...typography.bodyMedium,
    color: colors.white,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorText: {
    ...typography.bodyMedium,
    color: colors.error,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  retryButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryButtonText: {
    ...typography.bodyMedium,
    color: colors.white,
    fontWeight: '600',
  },
});

export default ProductListScreen;