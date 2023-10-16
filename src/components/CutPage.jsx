import { useEffect, useState, useContext } from "react";
import { LoginContext } from '../contexts/LoginContext'
import { SavedListContext } from '../contexts/SavedListContext'
import { URLContext } from '../contexts/URLContext'
import { View, Button, TextInput, Text, StyleSheet, ScrollView } from "react-native";
import Shapes from "./Shapes";
import NavBar from './NavBar'
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


const CutPage = () => {

    const [listaCorte, setListaCorte] = useState([])
    const [listaCanvas, setListaCanvas] = useState([])
    const [espaçosVazios, setEspaçosVazios] = useState([])
    const [listagem, setListagem] = useState([])
    const [w, setW] = useState('')
    const [h, setH] = useState('')
    const [quantidade, setQuantidade] = useState('')
    const [wChapa, setWChapa] = useState('')
    const [hChapa, setHChapa] = useState('')
    const [cutClick, setCutClick] = useState(false)
    const [direcaoCorte, setDirecaoCorte] = useState(false)

    const [storageHandler, setStorageHandler] = useState()

    const navigation = useNavigation()

    const { sessionId, setSessionId } = useContext(LoginContext)

    const { savedList, setSavedList, clearSavedList } = useContext(SavedListContext)


    const { url } = useContext(URLContext)


    async function getSavedList() {
        await axios.get(`${url}listas/${sessionId}/${savedList}`)
        .then((response) => {
                const corte = Array.from(response.data.lista, (peca) => ({
                  peca: true,
                  w: peca.w,
                  h: peca.h,
                  quantidade: peca.quantidade,
                  cortado: false,
                  x: null,
                  y: null
                }))

                console.log(corte)

            setListagem([...corte])

            setSavedList(null)

        })
        .catch((err) => {
            console.error(err)
        })

    }

    async function saveData() {

        const saveListagem = Array.from(listagem, (peca) => ({
          peca: true,
          w: peca.w,
          h: peca.h,
          quantidade: peca.quantidade,
          cortado: false,
          x: null,
          y: null
        }))

        await axios.post(`${url}listas/${sessionId}`, {
            lista: saveListagem,
            date: new Date(Date.now())
        })
        .then()
        .catch((err) => {
            console.error(err)
        })

    }

    function handleDeleteLista(index) {

        const modifiedListagem = [...listagem]
        modifiedListagem.splice(index, 1)

        setListagem([...modifiedListagem])

    }

    function handleDirecaoCorte() {

        setDirecaoCorte(!direcaoCorte)

    }
    
    async function saveLocal() {

        await AsyncStorage.setItem('listagemData', JSON.stringify(listagem))

        await AsyncStorage.setItem('storageHandler', '1')

        reload()


    }

    function handleListaCorte() {

        const novaPeca = {
            peca: true,
            w: Number(w),
            h: Number(h),
            cortado: false,
            x: null,
            y: null,
            quantidade: Number(quantidade)
          }
        
          setListagem([...listagem, novaPeca])
        
          setW('')
          setH('')
          setQuantidade('')

    }

    function handleEspaçosVazios() {

        let chapa = [{w: Number(wChapa), h: Number(hChapa), y: 0, x: 0, peca: false}]

        setEspaçosVazios([...espaçosVazios, chapa])

        setWChapa('')
        setHChapa('')

    }

    async function handleRefresh() {

        await AsyncStorage.removeItem('listagemData')
        

        clearSavedList()

        reload()

    }

    function reload() {

        navigation.navigate('LoginPage')
        navigation.navigate('CutPage')

            
    }

    useEffect(() => {

        if(savedList) {

            getSavedList()

        }
   
    }, [savedList])

    useEffect(() => {

        async function getAsyncData() {

            const storageHandler = await AsyncStorage.getItem('storageHandler')
            setStorageHandler(JSON.parse(storageHandler))

            const listagemData = await AsyncStorage.getItem('listagemData')
            if(listagemData) {
                setListagem([...listagem, ...JSON.parse(listagemData)])
            }

        }

        getAsyncData()

    }, [storageHandler])

    useEffect(() => {

        const newListaCorte = listagem.reduce((acc, peca) => {

            const corte = Array.from({ length: peca.quantidade }, () => ({

                peca: true,
                w: peca.w,
                h: peca.h,
                cortado: false,
                x: null,
                y: null

            }))

            return [...acc, ...corte]

        }, [])

        setListaCorte(newListaCorte)

    }, [listagem])

    useEffect(() => {

        setListaCorte([...listaCorte])

    }, [cutClick])

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            padding: 5, 
            gap: 5,
            display: 'flex',
            flexDirection: 'column', 
        },
        canvas: {
            width: '100%',
            height: '50%'
        },
        addItemArea: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            gap: 3, 
            justifyContent: 'center', 
            padding: 2
        },

        input: {
            borderWidth: 2,
            borderColor: '#27272a',
            borderRadius: 7,
            paddingLeft: 10,
        },
        input2: {
            width: '20%',
            borderWidth: 2,
            borderColor: '#27272a',
            borderRadius: 7,
            paddingLeft: 10
        },
        listagem: {
            borderWidth: 2,
            borderColor: '#27272a',
            width: '50%',
            paddingLeft: 10,
            paddingTop: 3,
            borderRadius: 7,
            
        }
    })

    return (  
        <ScrollView style={styles.container}>

            <NavBar />
            <View style={styles.addItemArea}>
                    
                <View style={{width: '50%', display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 10}}>
                    
                    <TextInput style={styles.input} value={w} inputMode="numeric" placeholder="Largura" onChangeText={text => setW(text)}></TextInput>

                    <TextInput style={styles.input} value={h} inputMode="numeric" placeholder="Altura" onChangeText={text => setH(text)}></TextInput>

                    <TextInput style={styles.input} value={quantidade} inputMode="numeric" placeholder="Quantidade" onChangeText={text => setQuantidade(text)}></TextInput>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 10}}>

                        <AntDesign name="plussquare" size={45} color="black" onPress={handleListaCorte}/>
                        <AntDesign name="closesquare" size={45} color="black" onPress={handleRefresh}/>
                        <Ionicons name="refresh-circle-sharp" size={45} color="black" onPress={saveLocal}/>

                    </View>



                </View>

                <View style={styles.listagem}>
                    
                    <Text style={{fontWeight: 500, fontSize: 18}}>Lista de Corte</Text>
                
                    {listagem.map((peca) => 
                    (
                        <View key={listagem.indexOf(peca)} style={{display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center'}}>
                            <Text key={listagem.indexOf(peca)} style={{fontSize: 18}}>
                                {peca.w} x {peca.h} x {peca.quantidade}
                            </Text>
                            <FontAwesome 
                            name="close" 
                            size={24} 
                            color="black" 
                            onPress={() => handleDeleteLista(listagem.indexOf(peca))}/>
                        </View>

                    ))}

                </View>

   

            </View>

            <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent:'center', gap: 10, alignItems:'center', marginTop: 10}}>
                <Text style={{fontWeight: 700, fontSize: 18}}>Chapa:</Text>
                <TextInput style={styles.input2} value={wChapa} inputMode="numeric" placeholder="Largura" onChangeText={text => setWChapa(text) }></TextInput>
                <TextInput style={styles.input2} value={hChapa} inputMode="numeric" placeholder="Altura" onChangeText={text => setHChapa(text)}></TextInput>
                <AntDesign name="plussquare" size={36} color="black" onPress={handleEspaçosVazios}/>

            </View>

                <View style={{display: 'flex', flexDirection: 'row', marginBottom: 10, marginTop: 10, width: '100%', justifyContent: 'center'}}>
                    <BouncyCheckbox fillColor='#27272a' onPress={handleDirecaoCorte}></BouncyCheckbox>
                    <Text style={{fontWeight: 700}}>Corte unidirecional</Text>

                </View>

                <View style={{display: 'flex', gap: 2}}>
                    <View style={{borderRadius: 10, overflow:'hidden', borderColorcolor:'#27272a'}}>
                        <Button color={'#27272a'} onPress={() => setCutClick(!cutClick)} title="Cortar"></Button>
                    </View>

                    <View style={{borderRadius: 10, overflow:'hidden', borderColorcolor:'#27272a'}}>
                        <Button color={'#27272a'} onPress={() => saveData()} title="Salvar"></Button>
                    </View>
                </View>




                <Shapes listaCanvas={listaCanvas} listaCorte={listaCorte} espaçosVazios={espaçosVazios} cutClick={cutClick} direcaoCorte={direcaoCorte}/>
      


        </ScrollView>
    );


}
 
export default CutPage;