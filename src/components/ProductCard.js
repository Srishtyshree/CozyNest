import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with padding

const ProductCard = ({ product, onPress, onFavoritePress }) => {
  const [isFavorite, setIsFavorite] = useState(product.isFavorite || false);

  const handleFavoritePress = () => {
    setIsFavorite(!isFavorite);
    onFavoritePress && onFavoritePress(product.id);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(product)}
      activeOpacity={0.8}
    >

      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="cover"
        />
        

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={handleFavoritePress}
          activeOpacity={0.7}
        >
          <Icon
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={20}
            color={isFavorite ? colors.error : colors.white}
          />
        </TouchableOpacity>

        {product.isNew && (
          <View style={[styles.badge, styles.newBadge]}>
            <Text style={styles.badgeText}>NEW</Text>
          </View>
        )}
        
        {discountPercentage > 0 && (
          <View style={[styles.badge, styles.discountBadge]}>
            <Text style={styles.badgeText}>-{discountPercentage}%</Text>
          </View>
        )}
      </View>


      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name}
        </Text>
        
        {product.rating && (
          <View style={styles.ratingContainer}>
            <Icon name="star" size={14} color={colors.accent} />
            <Text style={styles.ratingText}>{product.rating}</Text>
          </View>
        )}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    backgroundColor: colors.cardBackground,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.2,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.cream,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newBadge: {
    backgroundColor: colors.new,
  },
  discountBadge: {
    backgroundColor: colors.sale,
    top: 44,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 12,
  },
  productName: {
    ...typography.bodySmall,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 6,
    height: 36,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingText: {
    ...typography.caption,
    marginLeft: 4,
    color: colors.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    ...typography.priceSmall,
    color: colors.textPrimary,
  },
  originalPrice: {
    ...typography.caption,
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
});

export default ProductCard;