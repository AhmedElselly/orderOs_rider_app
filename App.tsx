import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloProvider } from "@apollo/client/react";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apolloClient } from "./src/api/apollo";
import RegisterScreen from "./src/screens/RegisterScreen";
import { Appearance, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { LightTheme } from "./src/theme";
import { Provider as PaperProvider } from "react-native-paper";
import StatusScreen from "./src/screens/StatusScreen";
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "./src/slices";
import LoginScreen from "./src/screens/LoginScreen";

// enableScreens();
Appearance.setColorScheme("light");
const Stack = createNativeStackNavigator();

export default function App() {
  // const [riderId, setRiderId] = useState<string | null>(null);
  // const rider = useSelector((state: RootState) => state.riderReducer.rider);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.clear();
    AsyncStorage.getItem("riderId").then((id) => {
      // setRiderId(id);

      setLoading(false);
    });
  }, []);

  if (loading) return null;

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <StatusBar
          barStyle={"dark-content"}
          networkActivityIndicatorVisible
          backgroundColor={"#fff"}
        />
        <PaperProvider theme={LightTheme}>
          <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{ headerShown: false }}
              >
                {/* {!riderId ? ( */}
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                {/* ) : (
            <>
              
              <Stack.Screen name="Job" component={JobScreen} />
            </>
          )} */}
                <Stack.Screen name="Status" component={StatusScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          </SafeAreaView>
        </PaperProvider>
      </Provider>
    </ApolloProvider>
  );
}
