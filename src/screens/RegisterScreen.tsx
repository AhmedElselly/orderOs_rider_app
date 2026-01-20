import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@apollo/client/react";
import { CREATE_RIDER } from "../api/mutations";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../slices";
import { authenticate } from "../slices/riderSlice";

type CreateRiderResult = {
  createRider: {
    id: string;
    name: string;
    status: string;
  };
};

type CreateRiderVars = {
  name: string;
};

export default function RegisterScreen() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const rider = useSelector((state: RootState) => state.riderReducer.rider);
  console.log({ rider });
  const [createRider, { loading }] = useMutation<
    CreateRiderResult,
    CreateRiderVars
  >(CREATE_RIDER);

  const submit = async () => {
    const res = await createRider({ variables: { name } });
    const id: string | null = res.data?.createRider.id || null;
    if (!id) return;
    await AsyncStorage.setItem("riderId", String(id));
    // onRegistered(id);
    dispatch(authenticate({ rider: id }));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text variant="headlineMedium" style={{ marginBottom: 20 }}>
        Rider Registration
      </Text>

      <TextInput
        label="Your name"
        mode="outlined"
        value={name}
        onChangeText={setName}
        style={{ marginBottom: 20 }}
      />

      <Button
        mode="elevated"
        textColor="#fff"
        onPress={submit}
        style={styles.btn}
      >
        Register
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    // backgroundColor: "#fff",
  },

  btn: {
    backgroundColor: "#000",
  },
});
