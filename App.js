import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';
import { getHeaderStyle } from './utils/headerStyles'; // Import the common header style

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'All My Goals',
            ...getHeaderStyle(), // Use the common header style
          }} 
        />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails} 
          options={({ route }) => ({
            title: route.params.goal.text,
            ...getHeaderStyle(), // Use the common header style
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
