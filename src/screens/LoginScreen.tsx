import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client/react";
import { GET_RIDER } from "../api/queries";

export default function LoginScreen({ onLoggedIn, navigation }: any) {
  const [riderId, setRiderId] = useState("");
  const [error, setError] = useState("");

  const [getRider, { loading }] = useLazyQuery(GET_RIDER, {
    onCompleted: async (data: any) => {
      if (!data?.rider) {
        setError("Rider not found");
        return;
      }

      await AsyncStorage.setItem("riderId", data.rider.id);
      onLoggedIn(data.rider.id);
    },
  });

  const submit = () => {
    setError("");
    if (!riderId.trim()) return;
    getRider({ variables: { id: riderId.trim() } });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="headlineMedium">Rider Login</Text>

        <TextInput
          label="Rider ID"
          mode="outlined"
          value={riderId}
          onChangeText={setRiderId}
          style={{ marginTop: 15 }}
        />

        {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

        <Button
          mode="contained"
          loading={loading}
          style={{ marginTop: 20 }}
          onPress={submit}
        >
          Login
        </Button>

        <Button
          mode="text"
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Register")}
        >
          Create new rider
        </Button>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  card: { padding: 20 },
});
