import { useState, useContext, useEffect } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { URLContext } from "../contexts/URLContext";

import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CutPage from './CutPage'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [haveAccount, setHaveAccount] = useState(true)
    const [error, setError] = useState('')

    const { sessionId, setSessionId } = useContext(LoginContext)
    
    const navigation = useNavigation()

    const { url } = useContext(URLContext)

    async function handleLogin(){  

        await axios.post(`${url}login`, {
            email: email,
            password: senha
        }) .then((response) => {
            AsyncStorage.setItem('userId', `${response.data.id}`)
            setSessionId(`${response.data.id}`)

        }) .catch((err) => {
            console.error(err)
            setError('Erro ao realizar o login')
        })


    }

    async function handleCreateUser () {

        await axios.post(`${url}login/create`, {
            email: email,
            password: senha
        }) .then((response) => {
            AsyncStorage.setItem('userId', `${response.data.id}`)
            setSessionId(`${response.data.id}`)


        }) .catch((err) => {
            console.error(err)
            setError('Erro ao criar usuário')
        })

    }

    

    
    useEffect(() => {

        function handleRedirect () {
            navigation.navigate('CutPage')
        }
    
        if(sessionId) {
            handleRedirect()
        }
    }, [sessionId])

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#e4e4e7',
            paddingTop:100,
            alignItems: 'center'
        },
        loginBox: {
            width: 300,
            height: 300,
            borderWidth: 1,
            borderColor: '#27272a',
            borderRadius: 7,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: '#d4d4d8',
            // elevation: 15,
            opacity: 100
        },
        inputBox: {
            width: 270,
            height: 180,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            backgroundColor: '#a1a1aa',
            padding: 20,
            borderRadius: 7,
        },
        largeText: {
            color: '#18181b',
            fontSize: 30,
            fontWeight: "900",
            paddingVertical: 10
        },
        input: {
            borderWidth: 2,
            borderColor: '#27272a',
            borderRadius: 7,
            paddingLeft: 10,
            backgroundColor: 'white',
            elevation: 15
        },
        swicthPossuiConta: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            paddingLeft: 40
        }
    })

    return (  

                <View style={styles.container}>

                    <View style={styles.loginBox}>
                        <Text style={styles.largeText}>{haveAccount ? 'Fazer login' : 'Criar conta'}</Text>
                        <View>
                            <View style={styles.inputBox}>
                                <TextInput
                                style={styles.input}
                                placeholder="Email"
                                onChangeText={text => setEmail(text)}
                                />
                                <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                onChangeText={text => setSenha(text)}
                                secureTextEntry
                                />
                                <View style={{borderRadius: 10, overflow:'hidden', elevation: 15}}>
                                    <Button 
                                    color={'#27272a'} 
                                    title={haveAccount ? 'Login' : 'Criar'}
                                    onPress={haveAccount ? () => {
                                        handleLogin()
                                    } : () => {
                                        handleCreateUser()
                                    }}
                                    ></Button>  
                                </View>
                            </View>

                            <View style={styles.swicthPossuiConta}>
                                <Text>{haveAccount ? 'Não possui conta?' : 'Já possui conta?'}</Text>
                                <Text
                                onPress={() => {
                                    setHaveAccount(!haveAccount)
                                    setError('')
                                }}
                                >Clique aqui</Text>
                                
                            </View>
                        </View>

                    </View>
                        <Text 
                        style={{fontSize: 18}}
                        onPress={() => navigation.navigate('CutPage')}>Continuar sem login</Text>
                        <Text style={{color: 'blue', fontSize: 20, fontWeight: 500}}>{error}</Text>
                </View>
   
    );
}
 
export default LoginPage;