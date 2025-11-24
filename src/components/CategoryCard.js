import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const CategoryCard = ({ category, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: category.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{category.name}</Text>
        {category.subtitle && (
          <Text style={styles.subtitle}>{category.subtitle}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 12,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  title: {
    ...typography.h4,
    color: colors.white,
    fontWeight: 'bold',
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.white,
    marginTop: 4,
  },
});

export default CategoryCard;