import React, {createContext, useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import * as Keychain from 'react-native-keychain';

const AuthContext = createContext<any>(null);

const Stack = createStackNavigator();

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const {expiresAt} = JSON.parse(credentials.password);
        if (Date.now() < expiresAt) {
          setIsAuthenticated(true);
        } else {
          await Keychain.resetGenericPassword();
          setIsAuthenticated(false);
        }
      }
    };
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      <NavigationContainer>
        <Stack.Navigator>
          {isAuthenticated ? (
            <Stack.Screen name="Profile" component={ProfileScreen} />
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
