import { View, StyleSheet } from "react-native";
import { Text, Button, ActivityIndicator, Card } from "react-native-paper";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GET_RIDER } from "../api/queries";

import { useMutation, useQuery, useSubscription } from "@apollo/client/react";
import { SET_STATUS } from "../api/mutations";
import { RIDER_ASSIGNED } from "../api/subscriptions";
import { useNavigation } from "@react-navigation/native";

// import { GET_RIDER } from "../api/rider.queries";
// import { SET_STATUS } from "../api/rider.mutations";
// import { RIDER_ASSIGNED } from "../api/rider.subscriptions";

export default function StatusScreen() {
  const navigation = useNavigation<any>();
  const [riderId, setRiderId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("riderId").then(setRiderId);
  }, []);

  if (!riderId) {
    return <ActivityIndicator style={{ marginTop: 50 }} />;
  }

  const { data, loading, refetch } = useQuery<any>(GET_RIDER, {
    variables: { id: riderId },
  });

  const [setStatus, { loading: statusLoading }] = useMutation(SET_STATUS);

  // Listen for live assignments
  useSubscription(RIDER_ASSIGNED, {
    variables: { riderId },
    onData: ({ data }: any) => {
      const order = data.data?.riderAssigned;
      if (order) {
        navigation.navigate("Job", { orderId: order.id });
      }
    },
  });

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  const rider: any = data?.rider || null;
  const isOnline = rider.status === "AVAILABLE";

  const toggleStatus = async () => {
    await setStatus({
      variables: {
        riderId,
        status: isOnline ? "OFFLINE" : "AVAILABLE",
      },
    });

    refetch();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Hello, {rider.name}</Text>

      <Card style={styles.card}>
        <Text variant="titleLarge">Status</Text>
        <Text style={{ marginVertical: 8 }}>
          {isOnline ? "🟢 AVAILABLE" : "🔴 OFFLINE"}
        </Text>

        <Button mode="contained" loading={statusLoading} onPress={toggleStatus}>
          {isOnline ? "Go Offline" : "Go Online"}
        </Button>
      </Card>

      {isOnline && (
        <Text style={{ marginTop: 20, color: "#666" }}>
          Waiting for assignments…
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    marginTop: 20,
    padding: 20,
  },
});
