import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';
import { getApiCategories, getWoodTypes, getFinishes, getSortOptions } from '../utils/helpers';

const FilterSheet = ({ visible, onClose, onApply, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: initialFilters.category || null,
    woodType: initialFilters.wood_type || null,
    finish: initialFilters.finish || null,
    minPrice: initialFilters.min_price || '',
    maxPrice: initialFilters.max_price || '',
    sort: initialFilters.sort || 'newest',
    featured: initialFilters.featured || false,
  });

  const categories = getApiCategories();
  const woodTypes = getWoodTypes();
  const finishes = getFinishes();
  const sortOptions = getSortOptions();

  const handleApply = () => {
    // Build filter params for API
    const apiParams = {};
    
    if (filters.category) apiParams.category = filters.category;
    if (filters.woodType) apiParams.wood_type = filters.woodType;
    if (filters.finish) apiParams.finish = filters.finish;
    if (filters.minPrice) apiParams.min_price = parseFloat(filters.minPrice);
    if (filters.maxPrice) apiParams.max_price = parseFloat(filters.maxPrice);
    if (filters.sort) apiParams.sort = filters.sort;
    if (filters.featured) apiParams.featured = true;

    onApply(apiParams);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      category: null,
      woodType: null,
      finish: null,
      minPrice: '',
      maxPrice: '',
      sort: 'newest',
      featured: false,
    });
  };

  const toggleCategory = (cat) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === cat ? null : cat,
    }));
  };

  const toggleWoodType = (wood) => {
    setFilters(prev => ({
      ...prev,
      woodType: prev.woodType === wood ? null : wood,
    }));
  };

  const toggleFinish = (finish) => {
    setFilters(prev => ({
      ...prev,
      finish: prev.finish === finish ? null : finish,
    }));
  };

  const setSort = (sort) => {
    setFilters(prev => ({ ...prev, sort }));
  };

  const toggleFeatured = () => {
    setFilters(prev => ({ ...prev, featured: !prev.featured }));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Sort */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <View style={styles.chipContainer}>
                {sortOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.chip,
                      filters.sort === option.value && styles.chipActive,
                    ]}
                    onPress={() => setSort(option.value)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filters.sort === option.value && styles.chipTextActive,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Featured Toggle */}
            <View style={styles.section}>
              <TouchableOpacity
                style={styles.toggleRow}
                onPress={toggleFeatured}
              >
                <Text style={styles.sectionTitle}>Featured Only</Text>
                <View
                  style={[
                    styles.toggle,
                    filters.featured && styles.toggleActive,
                  ]}
                >
                  {filters.featured && (
                    <Icon name="check" size={16} color={colors.white} />
                  )}
                </View>
              </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category</Text>
              <View style={styles.chipContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.chip,
                      filters.category === cat && styles.chipActive,
                    ]}
                    onPress={() => toggleCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filters.category === cat && styles.chipTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Wood Type */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Wood Type</Text>
              <View style={styles.chipContainer}>
                {woodTypes.map((wood) => (
                  <TouchableOpacity
                    key={wood}
                    style={[
                      styles.chip,
                      filters.woodType === wood && styles.chipActive,
                    ]}
                    onPress={() => toggleWoodType(wood)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filters.woodType === wood && styles.chipTextActive,
                      ]}
                    >
                      {wood}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Finish */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Finish</Text>
              <View style={styles.chipContainer}>
                {finishes.map((finish) => (
                  <TouchableOpacity
                    key={finish}
                    style={[
                      styles.chip,
                      filters.finish === finish && styles.chipActive,
                    ]}
                    onPress={() => toggleFinish(finish)}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        filters.finish === finish && styles.chipTextActive,
                      ]}
                    >
                      {finish}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Price Range */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <View style={styles.priceRow}>
                <View style={styles.priceInput}>
                  <Text style={styles.priceLabel}>Min</Text>
                  <Text style={styles.priceValue}>
                    ${filters.minPrice || '0'}
                  </Text>
                </View>
                <View style={styles.priceDivider} />
                <View style={styles.priceInput}>
                  <Text style={styles.priceLabel}>Max</Text>
                  <Text style={styles.priceValue}>
                    ${filters.maxPrice || '∞'}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={handleApply}
            >
              <Text style={styles.applyText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h3,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...typography.h4,
    marginBottom: 12,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceInput: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.cream,
    borderRadius: 12,
  },
  priceDivider: {
    width: 16,
    height: 2,
    backgroundColor: colors.border,
    marginHorizontal: 8,
  },
  priceLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  priceValue: {
    ...typography.h4,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  resetButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.cream,
    alignItems: 'center',
  },
  resetText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  applyButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  applyText: {
    ...typography.bodyMedium,
    color: colors.white,
    fontWeight: '600',
  },
});

export default FilterSheet;