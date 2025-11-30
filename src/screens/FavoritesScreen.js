import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useFavorites} from '../context/FavoritesContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const FavoritesScreen = ({navigation}) => {
  const {favorites, toggleFavorite} = useFavorites();

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetail', {product: item})}
    >
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color={colors.accent} />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => toggleFavorite(item)}
      >
        <Icon name="heart" size={20} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <Text style={styles.title}>My Favorites</Text>
        </View>
        <View style={styles.empty}>
          <Icon name="heart-outline" size={64} color={colors.textLight} />
          <Text style={styles.emptyTitle}>No favorites yet</Text>
          <Text style={styles.emptySubtitle}>Start exploring and save items you love.</Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('Explore')}
          >
            <Text style={styles.exploreText}>Explore Products</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
        <Text style={styles.countText}>{favorites.length} items</Text>
      </View>
      <FlatList
        data={favorites}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.white},
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {...typography.h2},
  countText: {...typography.bodyMedium, color: colors.textSecondary},
  listContent: {padding: 16},
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: colors.cream,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    ...typography.bodyMedium,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    ...typography.bodyMedium,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.caption,
    marginLeft: 4,
    color: colors.textSecondary,
  },
  removeButton: {
    padding: 8,
    justifyContent: 'center',
  },
  empty: {flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24},
  emptyTitle: {...typography.h4, marginBottom: 8, marginTop: 16},
  emptySubtitle: {...typography.bodyMedium, color: colors.textSecondary, textAlign: 'center', marginBottom: 24},
  exploreButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  exploreText: {
    ...typography.bodyMedium,
    color: colors.white,
    fontWeight: '600',
  },
});

export default FavoritesScreen;


