import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import {useCart} from '../context/CartContext';
import {colors} from '../styles/colors';
import {typography} from '../styles/typography';

const CheckoutScreen = ({navigation}) => {
    const {cartItems, cartTotal, clearCart} = useCart();
    const [paymentMethod, setPaymentMethod] = useState('cod'); // Default to Cash on Delivery
    const [address, setAddress] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        zip: '',
    });

    const handlePlaceOrder = () => {
        if (!address.name || !address.phone || !address.street || !address.city) {
            Alert.alert('Missing Info', 'Please fill in all shipping details.');
            return;
        }

        // Simulate order placement
        Alert.alert(
            'Order Placed!',
            'Your order has been placed successfully. Thank you for shopping with Cozynest!',
            [
                {
                    text: 'Back to Home',
                    onPress: () => {
                        clearCart();
                        navigation.navigate('MainTabs', {screen: 'Home'});
                    },
                },
            ]
        );
    };

    const shippingFee = 15;
    const grandTotal = cartTotal + shippingFee;

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Icon name="arrow-left" size={24} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Checkout</Text>
                <View style={{width: 40}} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Shipping Address */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Shipping Address</Text>
                    <View style={styles.inputGroup}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            value={address.name}
                            onChangeText={(text) => setAddress({...address, name: text})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            keyboardType="phone-pad"
                            value={address.phone}
                            onChangeText={(text) => setAddress({...address, phone: text})}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Street Address"
                            value={address.street}
                            onChangeText={(text) => setAddress({...address, street: text})}
                        />
                        <View style={styles.row}>
                            <TextInput
                                style={[styles.input, {flex: 2, marginRight: 8}]}
                                placeholder="City"
                                value={address.city}
                                onChangeText={(text) => setAddress({...address, city: text})}
                            />
                            <TextInput
                                style={[styles.input, {flex: 1}]}
                                placeholder="ZIP Code"
                                keyboardType="numeric"
                                value={address.zip}
                                onChangeText={(text) => setAddress({...address, zip: text})}
                            />
                        </View>
                    </View>
                </View>

                {/* Payment Method */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentOptionActive]}
                        onPress={() => setPaymentMethod('cod')}
                    >
                        <Icon
                            name={paymentMethod === 'cod' ? 'radiobox-marked' : 'radiobox-blank'}
                            size={24}
                            color={paymentMethod === 'cod' ? colors.primary : colors.textLight}
                        />
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentLabel}>Cash on Delivery</Text>
                            <Text style={styles.paymentSub}>Pay when you receive your order</Text>
                        </View>
                        <Icon name="cash" size={24} color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionActive, styles.disabledOption]}
                        onPress={() => { }}
                        disabled={true}
                    >
                        <Icon
                            name="radiobox-blank"
                            size={24}
                            color={colors.textLight}
                        />
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentLabel}>Credit/Debit Card (Coming Soon)</Text>
                            <Text style={styles.paymentSub}>Visa, Mastercard, etc.</Text>
                        </View>
                        <Icon name="credit-card-outline" size={24} color={colors.textLight} />
                    </TouchableOpacity>
                </View>

                {/* Order Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Subtotal</Text>
                            <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping Fee</Text>
                            <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Grand Total</Text>
                            <Text style={styles.totalValue}>${grandTotal.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Place Order Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
                    <Text style={styles.placeOrderText}>Place Order • ${grandTotal.toFixed(2)}</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        ...typography.h3,
        color: colors.textPrimary,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        ...typography.h4,
        color: colors.textPrimary,
        marginBottom: 16,
    },
    inputGroup: {
        gap: 12,
    },
    row: {
        flexDirection: 'row',
    },
    input: {
        backgroundColor: colors.cream,
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: colors.textPrimary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
    },
    paymentOptionActive: {
        borderColor: colors.primary,
        backgroundColor: colors.primary + '05',
    },
    disabledOption: {
        opacity: 0.5,
    },
    paymentInfo: {
        flex: 1,
        marginLeft: 12,
    },
    paymentLabel: {
        ...typography.bodyMedium,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    paymentSub: {
        ...typography.caption,
        color: colors.textSecondary,
        marginTop: 2,
    },
    summaryCard: {
        backgroundColor: colors.cream,
        borderRadius: 12,
        padding: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    summaryLabel: {
        ...typography.bodyMedium,
        color: colors.textSecondary,
    },
    summaryValue: {
        ...typography.bodyMedium,
        fontWeight: '600',
        color: colors.textPrimary,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        marginBottom: 0,
    },
    totalLabel: {
        ...typography.h4,
        color: colors.textPrimary,
    },
    totalValue: {
        ...typography.h3,
        color: colors.primary,
    },
    footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        backgroundColor: colors.white,
    },
    placeOrderButton: {
        backgroundColor: colors.primary,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    placeOrderText: {
        ...typography.h4,
        color: colors.white,
        fontWeight: '600',
    },
});

export default CheckoutScreen;
