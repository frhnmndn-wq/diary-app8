import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerBackButtonDisplayMode: "minimal",
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            title: "Home",
          }}
        />
        <Stack.Screen
          name="detail/[id]"
          options={{
            title: "Detail Diary",
          }}
        />
        <Stack.Screen
          name="edit/[id]"
          options={{
            title: "Edit Diary",
          }}
        />
      </Stack>
    </Provider>
  );
}