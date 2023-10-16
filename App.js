import CutPage from './src/components/CutPage';
import LoginPage from './src/components/Loginpage';
import CutLists from './src/components/CutLists';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';

import { LoginProvider } from './src/contexts/LoginContext';
import { ListContextProvider } from './src/contexts/SavedListContext';
import { URLContextProvider } from './src/contexts/URLContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <URLContextProvider>

      <LoginProvider>

        <ListContextProvider>

          <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen name="LoginPage" component={LoginPage}/>
                <Stack.Screen name="CutPage" component={CutPage}/>
                <Stack.Screen name="CutLists" component={CutLists}/>
              </Stack.Navigator>
            </NavigationContainer>
          
        </ListContextProvider>

      </LoginProvider>

    </URLContextProvider>


  );
}

