import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Order} from "../types";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';
import { formatPrice } from "../helpers";

dayjs.locale('pt-br');
dayjs.extend(relativeTime);

type OrderCardProps = {
    order: Order;
}

function dateFromNow(date: string) {
    return dayjs(date).fromNow();
}

function OrderCard({ order } : OrderCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.orderName}>Pedido {order.id}</Text>
                <Text style={styles.orderPrice}>R$ {order.total}</Text>
            </View>
            <Text style={styles.text}>{dateFromNow(order.moment)}</Text>
            <View style={styles.productsList}>
                {order.products.map(product => (
                    <Text
                        key={product.id}
                        style={styles.text}
                    >
                        {product.name}
                    </Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: '10%',
        marginLeft: '2%',
        marginRight: '2%',
        marginBottom: '2%',
        padding: 15,
        backgroundColor: '#FFF',
        shadowOpacity: 0.25,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 4},
        shadowRadius: 20,
        borderRadius: 10,
        elevation: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    orderName: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        letterSpacing: -0.24,
        color: '#263238',
        fontFamily: 'OpenSans_700Bold'
    },
    orderPrice: {
        fontWeight: 'bold',
        fontSize: 18,
        lineHeight: 25,
        textAlign: 'right',
        letterSpacing: -0.24,
        color: '#DA5C5C',
        fontFamily: 'OpenSans_700Bold'
    },
    text: {
        fontWeight: 'normal',
        fontSize: 14,
        lineHeight: 19,
        letterSpacing: -0.24,
        color: '#9E9E9E',
        fontFamily: 'OpenSans_400Regular'
    },
    productsList: {
        borderTopColor: '#E6E6E6',
        borderTopWidth: 1,
        marginTop: 20,
        paddingTop: 15
    }
})

export default OrderCard;