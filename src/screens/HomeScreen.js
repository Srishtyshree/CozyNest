import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import SearchBar from '../components/SearchBar';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { globalStyles } from '../styles/globalStyles';
import FurnitureAPI from '../services/api';
import { transformApiProduct } from '../utils/helpers';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Static categories (you can customize these)
  const categories = [
    { 
      id: '1', 
      name: 'Living Room', 
      apiCategory: 'sofa',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400', 
      subtitle: 'Modern' 
    },
    { 
      id: '2', 
      name: 'Bedroom', 
      apiCategory: 'matress',
      image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400', 
      subtitle: 'Cozy' 
    },
    { 
      id: '3', 
      name: 'Kitchen', 
      apiCategory: 'kitchen',
      image: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=400', 
      subtitle: 'Modern' 
    },
    { 
      id: '4', 
      name: 'Dining', 
      apiCategory: 'table',
      image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400', 
      subtitle: 'Elegant' 
    },
  ];

  // Fetch featured products on mount
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await FurnitureAPI.getFeaturedProducts(8);
      
      if (response.success && response.data) {
        const transformedProducts = response.data.map(transformApiProduct);
        setFeaturedProducts(transformedProducts);
      }
    } catch (err) {
      console.error('Error fetching featured products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate('ProductList', { 
      category: category,
      apiCategory: category.apiCategory,
    });
  };

  const handleFilterPress = async (filterType) => {
    try {
      let params = { limit: 20 };
      
      switch(filterType) {
        case 'New Arrivals':
          params.sort = 'newest';
          break;
        case 'Best Sellers':
          params.featured = true;
          break;
        case 'Under $100':
          params.max_price = 100;
          break;
        case 'On Sale':
          // We'll fetch and filter on client side
          const response = await FurnitureAPI.getDiscountedProducts(20);
          if (response.success) {
            navigation.navigate('ProductList', { 
              title: filterType,
              preloadedProducts: response.data.map(transformApiProduct),
            });
          }
          return;
      }
      
      navigation.navigate('ProductList', { 
        title: filterType,
        filterParams: params,
      });
    } catch (err) {
      console.error('Error applying filter:', err);
    }
  };

  const renderCategoryItem = ({ item }) => (
    <CategoryCard
      category={item}
      onPress={() => handleCategoryPress(item)}
      style={{ width: width * 0.7 }}
    />
  );

  return (
    <SafeAreaView style={globalStyles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.headerTitle}>Find Your Dream Decor</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell-outline" size={24} color={colors.textPrimary} />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={() => setSearchQuery('')}
            onFocus={() => navigation.navigate('Search')}
          />
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={[globalStyles.spaceBetween, styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>Browse by Room</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        {/* Quick Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterChips}
          contentContainerStyle={styles.filterChipsContent}
        >
          {['New Arrivals', 'Best Sellers', 'Under $100', 'On Sale'].map((filter, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.filterChip}
              activeOpacity={0.7}
              onPress={() => handleFilterPress(filter)}
            >
              <Text style={styles.filterChipText}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={[globalStyles.spaceBetween, styles.sectionHeader]}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity 
              onPress={() => navigation.navigate('ProductList', { 
                title: 'All Products',
                filterParams: { featured: true }
              })}
            >
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={styles.loadingText}>Loading products...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={fetchFeaturedProducts}
              >
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPress={(product) => navigation.navigate('ProductDetail', { product })}
                  onFavoritePress={(id) => console.log('Favorite:', id)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  greeting: {
    ...typography.bodySmall,
    color: colors.textSecondary,
  },
  headerTitle: {
    ...typography.h2,
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    ...typography.h3,
  },
  seeAll: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  categoryList: {
    paddingLeft: 16,
    paddingRight: 4,
  },
  filterChips: {
    marginBottom: 24,
  },
  filterChipsContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  loadingText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 12,
  },
  errorContainer: {
    paddingVertical: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  errorText: {
    ...typography.bodyMedium,
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  retryText: {
    ...typography.bodyMedium,
    color: colors.white,
    fontWeight: '600',
  },
});

export default HomeScreen;