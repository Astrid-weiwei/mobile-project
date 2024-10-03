import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home'; // Make sure the path to Home is correct
import GoalDetails from './components/GoalDetails'; // Import the GoalDetails component

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Customizing the Home screen's navigation bar */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home', // Set the title on the navigation bar
            headerStyle: {
              backgroundColor: '#f4511e', // Set the background color of the header
            },
            headerTintColor: '#fff', // Set the font color of the header text
          }}
        />
        <Stack.Screen name="Details" component={GoalDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
