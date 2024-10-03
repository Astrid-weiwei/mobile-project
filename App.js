import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import GoalDetails from './components/GoalDetails';

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
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: '#fff',
          }} 
        />
        <Stack.Screen 
          name="Details" 
          component={GoalDetails} 
          options={({ route }) => ({
            title: route.params.goal.text, // Set the title dynamically using route.params
            headerStyle: { backgroundColor: 'purple' },
            headerTintColor: '#fff',
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
