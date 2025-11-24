import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import FurnitureAPI from '../services/api';
import { transformApiProduct, formatPrice } from '../utils/helpers';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route, navigation }) => {
  const { product: initialProduct } = route.params || {};
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (initialProduct?.sku) {
      fetchProductDetails(initialProduct.sku);
    }
  }, [initialProduct?.sku]);

  const fetchProductDetails = async (sku) => {
    try {
      setLoading(true);
      setError(null);
      const response = await FurnitureAPI.getProductBySku(sku);
      
      if (response.success && response.data) {
        setProduct(transformApiProduct(response.data));
      }
    } catch (err) {
      console.error('Error fetching product details:', err);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', product.id, 'Quantity:', quantity);
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buy now:', product.id, 'Quantity:', quantity);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading product...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Icon name="alert-circle" size={64} color={colors.error} />
          <Text style={styles.errorText}>{error || 'Product not found'}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Icon name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity 
          onPress={() => setIsFavorite(!isFavorite)}
          style={styles.headerButton}
        >
          <Icon 
            name={isFavorite ? 'heart' : 'heart-outline'} 
            size={24} 
            color={isFavorite ? colors.error : colors.textPrimary} 
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.image}
            resizeMode="cover"
          />
          {product.isNew && (
            <View style={styles.newBadge}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          )}
          {discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.badgeText}>-{discountPercentage}%</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          {/* Category */}
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          {/* Name */}
          <Text style={styles.title}>{product.name}</Text>

          {/* Rating & Stock */}
          <View style={styles.metaRow}>
            {product.rating && (
              <View style={styles.ratingContainer}>
                <Icon name="star" size={16} color={colors.accent} />
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
            )}
            <View style={styles.stockContainer}>
              <Icon 
                name="package-variant" 
                size={16} 
                color={product.stock > 0 ? colors.success : colors.error} 
              />
              <Text style={[
                styles.stockText,
                { color: product.stock > 0 ? colors.success : colors.error }
              ]}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Specifications */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specGrid}>
              {product.woodType && (
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Wood Type</Text>
                  <Text style={styles.specValue}>{product.woodType}</Text>
                </View>
              )}
              {product.finish && (
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Finish</Text>
                  <Text style={styles.specValue}>{product.finish}</Text>
                </View>
              )}
              {product.dimensions && (
                <>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Width</Text>
                    <Text style={styles.specValue}>{product.dimensions.width} cm</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Height</Text>
                    <Text style={styles.specValue}>{product.dimensions.height} cm</Text>
                  </View>
                  <View style={styles.specItem}>
                    <Text style={styles.specLabel}>Depth</Text>
                    <Text style={styles.specValue}>{product.dimensions.depth} cm</Text>
                  </View>
                </>
              )}
              {product.weight && (
                <View style={styles.specItem}>
                  <Text style={styles.specLabel}>Weight</Text>
                  <Text style={styles.specValue}>{product.weight} kg</Text>
                </View>
              )}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Icon name="minus" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.min(product.stock, quantity + 1))}
                disabled={quantity >= product.stock}
              >
                <Icon 
                  name="plus" 
                  size={20} 
                  color={quantity >= product.stock ? colors.textLight : colors.textPrimary} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View style={styles.stickyBar}>
        <TouchableOpacity 
          style={styles.cartBtn}
          onPress={handleAddToCart}
          disabled={product.stock === 0}
        >
          <Icon name="cart-outline" size={20} color={colors.white} />
          <Text style={styles.btnText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buyBtn, product.stock === 0 && styles.disabledBtn]}
          onPress={handleBuyNow}
          disabled={product.stock === 0}
        >
          <Text style={styles.btnTextPrimary}>
            {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.h4,
  },
  content: { paddingBottom: 100 },
  imageContainer: {
    width: '100%',
    height: width * 1.2,
    backgroundColor: colors.cream,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  newBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: colors.new,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  discountBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: colors.sale,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 16,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: colors.cream,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 12,
  },
  categoryText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: { 
    ...typography.h2, 
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  ratingText: {
    ...typography.bodyMedium,
    marginLeft: 4,
    color: colors.textSecondary,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockText: {
    ...typography.bodyMedium,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  price: { 
    ...typography.h2, 
    color: colors.primary,
  },
  originalPrice: { 
    ...typography.h4, 
    color: colors.textLight, 
    textDecorationLine: 'line-through',
    marginLeft: 12,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: { 
    ...typography.h4, 
    marginBottom: 12,
  },
  description: { 
    ...typography.bodyMedium, 
    color: colors.textSecondary,
    lineHeight: 24,
  },
  specGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specItem: {
    width: '50%',
    marginBottom: 16,
  },
  specLabel: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  specValue: {
    ...typography.bodyMedium,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    ...typography.h4,
    marginHorizontal: 24,
    minWidth: 40,
    textAlign: 'center',
  },
  stickyBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    gap: 12,
  },
  cartBtn: { 
    flex: 1, 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: colors.textPrimary, 
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buyBtn: { 
    flex: 1, 
    padding: 16, 
    borderRadius: 12, 
    backgroundColor: colors.primary, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledBtn: {
    backgroundColor: colors.border,
  },
  btnText: { 
    ...typography.bodyMedium, 
    color: colors.white, 
    fontWeight: '600',
  },
  btnTextPrimary: { 
    ...typography.bodyMedium, 
    color: colors.white, 
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginTop: 12,
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
  retryText: {
    ...typography.bodyMedium,
    color: colors.white,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;