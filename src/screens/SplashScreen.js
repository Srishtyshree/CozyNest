import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Animated, Image} from 'react-native';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const SplashScreen = () => {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, {opacity: fadeAnim}]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>CU</Text>
        </View>
        <Text style={styles.title}>Cozynest</Text>
        <Text style={styles.subtitle}>Urni Decor</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoText: {
    ...typography.h1,
    color: colors.primary,
    fontSize: 40,
    fontWeight: 'bold',
  },
  title: {
    ...typography.h1,
    color: colors.white,
    fontSize: 32,
    letterSpacing: 2,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.white,
    opacity: 0.8,
    marginTop: 8,
  },
});

export default SplashScreen;