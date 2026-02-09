import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 56) / 2; // Further increased gap to 24px (32px side padding + 24px center gap)

const ProductCard = ({product, onPress, onFavoritePress}) => {
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
          source={{uri: product.image}}
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden', // Ensure content doesn't bleed out
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.1, // Slightly shorter for better balance
    backgroundColor: colors.cream,
    position: 'relative',
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
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  badge: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  newBadge: {
    backgroundColor: colors.new,
    top: 8,
    right: 8,
  },
  discountBadge: {
    backgroundColor: colors.sale,
    bottom: 8,
    right: 8,
  },
  badgeText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 10,
  },
  infoContainer: {
    padding: 14, // Increased padding for even more breathing room
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  productName: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
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
    fontSize: 11,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  price: {
    ...typography.bodyMedium,
    fontWeight: '700',
    color: colors.primary,
  },
  originalPrice: {
    ...typography.caption,
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: 6,
    fontSize: 11,
  },
});

export default ProductCard;