import { View, StyleSheet } from "react-native";
import { Text, TextInput, Button, Card } from "react-native-paper";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { GET_RIDER } from "../api/queries";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices";
import { authenticate } from "../slices/riderSlice";
import { riderLogin } from "../api/mutations";

export default function LoginScreen({ onLoggedIn, navigation }: any) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();

  const rider = useSelector((state: RootState) => state.riderReducer.rider);
  console.log({ rider });
  // const [error, setError] = useState("");

  // const [getRider, { loading }] = useLazyQuery(GET_RIDER);
  const [mutateLogin, { loading, error }] = useMutation(riderLogin);

  const submit = () => {
    if (!email.trim()) return;
    mutateLogin({
      variables: { email: email.trim(), password: "123456" },
    }).then(async (res: any) => {
      await AsyncStorage.setItem("rider", res.data.rider);
      dispatch(authenticate({ rider: res.data.rider }));
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text variant="headlineMedium">Rider Login</Text>

        <TextInput
          autoCapitalize={"none"}
          label="Rider Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={{ marginTop: 15 }}
        />
        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          style={{ marginTop: 15 }}
          secureTextEntry
        />

        {error ? (
          <Text style={{ color: "red" }}>Something went wrong!</Text>
        ) : null}

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
