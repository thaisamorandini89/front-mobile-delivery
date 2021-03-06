import React, {useEffect, useState} from "react";
import {Alert, ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import Header from "../Header";
import OrderCard from "../OrderCard";
import {fetchOrders} from "../api";
import {Order} from "../types";
import {useIsFocused} from "@react-navigation/native";

function Orders() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const isFocused = useIsFocused();
    const fetchData = () => {
        setIsLoading(true);
        fetchOrders()
            .then(response => setOrders(response.data))
            .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return (
        <>
            <Header/>
            <ScrollView style={styles.container}>
                {isLoading ? (
                    <Text>Buscando pedidos...</Text>
                ) : (
                    orders.map(order => (
                        <TouchableOpacity
                            key={order.id}
                        >
                            <OrderCard order={order}/>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%'
    }
});

export default Orders;