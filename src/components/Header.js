import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { colors } from '../styles/colors';
import { typography } from '../styles/typography';

const Header = ({ 
  title, 
  showBack = false, 
  onBackPress,
  showCart = false,
  onCartPress,
  showFilter = false,
  onFilterPress,
  rightIcon,
  onRightPress,
}) => {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={styles.container}>
        {/* Left Side */}
        <View style={styles.leftContainer}>
          {showBack && (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </View>

        {/* Right Side */}
        <View style={styles.rightContainer}>
          {showFilter && (
            <TouchableOpacity
              onPress={onFilterPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Icon name="tune-variant" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
          
          {showCart && (
            <TouchableOpacity
              onPress={onCartPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Icon name="cart-outline" size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          )}

          {rightIcon && (
            <TouchableOpacity
              onPress={onRightPress}
              style={styles.iconButton}
              activeOpacity={0.7}
            >
              <Icon name={rightIcon} size={24} color={colors.textPrimary} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.white,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leftContainer: {
    width: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    width: 40,
    justifyContent: 'flex-end',
  },
  title: {
    ...typography.h3,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;