import { View, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginLoggouButton = () => {

    const { sessionId, setSessionId } = useContext(LoginContext)
    const navigation = useNavigation()
    
    
    async function handleLoggout () {
    
        setSessionId('')
        await AsyncStorage.setItem('loginId', '')
        navigation.navigate('LoginPage')
    
    }
    
    function handleLogin () {
    
        navigation.navigate('LoginPage')
    
    }

    return (  
        <View style={{borderRadius: 10, overflow:'hidden'}}>
            <Button 
            title={sessionId ? "LOGGOUT" : 'LOGIN'}
            onPress={sessionId ? handleLoggout : handleLogin}
            color={'#27272a'}
            />
        </View>

    );
}

const CutPageButton = () => {
    const navigator = useNavigation()

    return (  

        <View style={{borderRadius: 10, overflow:'hidden'}}>
        <Button 
        color={'#27272a'}
        title="CutPage"
        onPress={() => {
            navigator.navigate('CutPage')
        }}
        />
        </View>

    );
}

const CutListButton = () => {
    const navigator = useNavigation()

    return (  

        <View style={{borderRadius: 10, overflow:'hidden'}}>
            <Button 
            color={'#27272a'}

            title="CutList"
            onPress={() => {
                navigator.navigate('CutLists')
            }}
            />
        </View>
        
    );
}

const NavBar = () => {

    const styles = StyleSheet.create({

        navBar: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-evenly',
            padding: 5,
            backgroundColor: '#a1a1aa',
            marginBottom: 10,
            elevation: 10,
        }

    })

    return (  
        <View style={styles.navBar}>
            <CutPageButton />
            <CutListButton />
            <LoginLoggouButton />
        </View>
    );
}
 
export default NavBar;