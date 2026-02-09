import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useCart} from '../context/CartContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const CartScreen = ({navigation}) => {
    const {cartItems, removeFromCart, updateQuantity, cartTotal} = useCart();

    const handleCheckout = () => {
        navigation.navigate('Checkout');
    };

    const renderItem = ({item}) => (
        <View style={styles.cartItem}>
            <Image
                source={{uri: item.image || 'https://via.placeholder.com/80'}}
                style={styles.itemImage}
                resizeMode="cover"
            />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        style={styles.quantityButton}
                    >
                        <Icon name="minus" size={16} color={colors.textPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        style={styles.quantityButton}
                    >
                        <Icon name="plus" size={16} color={colors.textPrimary} />
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => removeFromCart(item.id)}
                style={styles.removeButton}
            >
                <Icon name="trash-can-outline" size={20} color={colors.error} />
            </TouchableOpacity>
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <SafeAreaView style={styles.container} edges={['top']}>
                <View style={styles.header}>
                    <Text style={styles.title}>My Cart</Text>
                </View>
                <View style={styles.emptyContainer}>
                    <Icon name="cart-outline" size={64} color={colors.textLight} />
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <TouchableOpacity
                        style={styles.shopNowButton}
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.shopNowText}>Start Shopping</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.title}>My Cart</Text>
                <Text style={styles.itemCount}>{cartItems.length} items</Text>
            </View>

            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalAmount}>${cartTotal.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        ...typography.h2,
    },
    itemCount: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
    },
    listContent: {
        padding: 16,
    },
    cartItem: {
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
        justifyContent: 'space-between',
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
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cream,
        alignSelf: 'flex-start',
        borderRadius: 6,
        padding: 2,
    },
    quantityButton: {
        padding: 4,
    },
    quantityText: {
        ...typography.bodySmall,
        marginHorizontal: 8,
        fontWeight: '600',
        minWidth: 16,
        textAlign: 'center',
    },
    removeButton: {
        padding: 4,
        justifyContent: 'center',
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.white,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    totalLabel: {
        ...typography.h4,
        color: colors.textSecondary,
    },
    totalAmount: {
        ...typography.h2,
        color: colors.primary,
    },
    checkoutButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    checkoutText: {
        ...typography.h4,
        color: colors.white,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    emptyText: {
        ...typography.h4,
        color: colors.textSecondary,
        marginTop: 16,
        marginBottom: 24,
    },
    shopNowButton: {
        paddingHorizontal: 24,
        paddingVertical: 12,
        backgroundColor: colors.primary,
        borderRadius: 8,
    },
    shopNowText: {
        ...typography.bodyMedium,
        color: colors.white,
        fontWeight: '600',
    },
});

export default CartScreen;
