import {createStackNavigator} from '@react-navigation/stack';
import {Checkout} from '../screens/Checkout';
import {Home} from '../screens/Home';

const Stack = createStackNavigator();

const StackRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
};

export default StackRoutes;
