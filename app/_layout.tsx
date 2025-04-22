import { Stack } from 'expo-router';
import "../global.css"

export default function RootLayout() {

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >

      <Stack.Screen
        name="(main)"
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="index"
        options={{
         title: 'Home',
        }}
      />
      
      <Stack.Screen
        name="product/[id]"
        options={{
         title: '',
        }}
      />
      
      

    </Stack>
  );
}
