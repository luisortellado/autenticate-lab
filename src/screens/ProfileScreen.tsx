import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import * as Keychain from 'react-native-keychain';
import {useAuth} from '../../App';

const ProfileScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {setIsAuthenticated} = useAuth();
  const handleLogout = async () => {
    await Keychain.resetGenericPassword();
    setIsAuthenticated(false);
    setTimeout(() => {
      navigation.navigate('Login');
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Profile Screen!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 18, marginBottom: 16},
});

export default ProfileScreen;
