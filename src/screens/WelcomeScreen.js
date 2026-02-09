import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LinearGradient} from 'expo-linear-gradient';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const {width, height} = Dimensions.get('window');

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <LinearGradient
        colors={['#F8F6F4', '#FFFFFF']}
        style={styles.gradient}
      >
        {/* Logo/Brand Section */}
        <View style={styles.logoContainer}>
          <View style={styles.logoCircle}>
            <Text style={styles.logoText}>CU</Text>
          </View>
          <Text style={styles.brandName}>Cozynest</Text>
          <Text style={styles.tagline}>Urni Decor</Text>
        </View>

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Welcome Text */}
        <View style={styles.contentContainer}>
          <Text style={styles.welcomeTitle}>
            Discover Beautiful Furniture
          </Text>
          <Text style={styles.welcomeSubtitle}>
            Transform your space with our curated collection of modern and elegant furniture pieces
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('Signup')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  gradient: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
  },
  brandName: {
    ...typography.h1,
    fontSize: 32,
    marginBottom: 8,
  },
  tagline: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
  },
  imageContainer: {
    width: width,
    height: height * 0.35,
    marginVertical: 20,
    paddingHorizontal: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  contentContainer: {
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  welcomeTitle: {
    ...typography.h2,
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    paddingHorizontal: 32,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    ...typography.h4,
    color: colors.white,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    ...typography.h4,
    color: colors.primary,
    fontWeight: '600',
  },
});

export default WelcomeScreen;