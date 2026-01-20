import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery } from "@apollo/client/react";
import { GET_RIDER } from "../api/queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices";
import { authenticate } from "../slices/riderSlice";

export default function LoginScreen({ onLoggedIn, navigation }: any) {
  const [riderId, setRiderId] = useState("");
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const rider = useSelector((state: RootState) => state.riderReducer.rider);
  console.log({ rider });
  const [error, setError] = useState("");

  const [getRider, { loading }] = useLazyQuery(GET_RIDER);

  const submit = () => {
    setError("");
    if (!riderId.trim()) return;
    getRider({ variables: { id: riderId.trim() } }).then(async (res: any) => {
      await AsyncStorage.setItem("rider", res.data.rider);
      dispatch(authenticate({ rider: res.data.rider }));
    });
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
