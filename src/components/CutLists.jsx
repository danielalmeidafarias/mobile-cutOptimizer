import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import { SavedListContext } from "../contexts/SavedListContext";
import { ListContextProvider } from "../contexts/SavedListContext";
import { URLContext } from "../contexts/URLContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import NavBar from "./NavBar";

const CutLists = () => {
    
    const [listagem, setListagem] = useState([])
    const [click, setClick] = useState(false)

    const { sessionId } = useContext(LoginContext)

    const navigation = useNavigation()

    const { setSavedList } = useContext(SavedListContext)

    const { url } = useContext(URLContext)



    async function getListaCorte() {
        await axios.get(`${url}listas/${sessionId}`)
            .then((response) => {
                setListagem([...response.data])
            })
            .catch((err) => {
                console.error(err)
            })
    }

    async function handleDeleteCorte(id) {
        await axios.post(`${url}listas/delete/${sessionId}`, {
            id: id,
        })
        .then()
        .catch((err) => {
            console.error(err)
        })

        reload()

    }

    function reload() {

        navigation.navigate('LoginPage')
        navigation.navigate('CutPage')
            
    }
    
    useEffect(() => {

        getListaCorte() 

    }, [click])

    const styles = StyleSheet.create({
        screen : {
            display: 'flex',
            flexDirection: 'column',
            padding: 3,
        },
        lista: {
            display: 'flex',
            width: 250,
            height: 200,
            flexDirection: 'column',
            gap: 3,
            borderWidth: 2,
            borderColor: '#27272a',
            paddingLeft: 5
        },
        listaContainer: {
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: 3
        },
        container: {
            display: 'flex',
            alignItems: 'center'
        },
        largeText: {
            fontSize: 25,
            fontWeight: "900"
        },
        smallText: {
            fontSize: 20
        }
    })

    return (  
        <ListContextProvider>
        <ScrollView style={styles.screen}>
            <NavBar />
            {sessionId ? (
                
                <View style={styles.container}>
                    {listagem.map(listas => (

                        <View style={styles.listaContainer} key={listas.id}>

                            <View style={styles.lista}>
                                <Text style={styles.largeText}>{`Lista ${listas.date.substring(0, 10)}`}</Text>
                                {listas.lista.map(peca => (
                                    <View key={listas.lista.indexOf(peca)}>
                                        <Text  style={styles.smallText}>{peca.w} x {peca.h} x {peca.quantidade}</Text>
                                    </View>
                                ))}
                            </View>

                            <View style={{display: 'flex', flexDirection: 'row', gap: 1}}>

                                <View style={{borderRadius: 5, overflow:'hidden', width: 90}}>
                                    <Button 
                                    color={'#27272a'}  
                                    title="REMOVER"
                                    onPress={() => {
                                        handleDeleteCorte(listas.id)
                                        setClick(!click)
                                    }}>
                                    </Button>  
                                </View>

                                <View style={{borderRadius: 5, overflow:'hidden', width: 80}}>
                                    <Button
                                    color={'#27272a'}  
                                    title="CORTAR"
                                    onPress={async() => {
                                        setSavedList(listas.id)
                                        navigation.navigate('CutPage')
                                    }}>
                                    </Button>  
                                </View>

                            </View>

                        </View>
                    ))}
                </View>

            ) : (

                <View>
                    <Text>Faça o login para acessar suas listas de corte</Text>
                </View>)
            }
        </ScrollView>
        </ListContextProvider>
    );
}
 
export default CutLists;