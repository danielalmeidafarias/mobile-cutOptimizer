import React, { useRef, useContext, useState, useEffect } from 'react'
import { URLContext } from '../contexts/URLContext'
import { Button, StyleSheet, View, Image, Dimensions } from 'react-native'
import { captureRef } from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import axios from 'axios'

export default function Canvas(props) {

    let { listaDesenho, size, id } = props

    const { url } = useContext(URLContext) 

    const ref = useRef()

    const [img, setImg] = useState('')

    const screen = Dimensions.get('screen')
    const screenWidth = screen.width
    const u = (screenWidth - 20) /2750

    const [status, requestPermission] = MediaLibrary.usePermissions()

    if(status === null) [
        requestPermission()
    ]

    async function getImage() {
        
        await axios.post(`${url}mobile`, {
            listaDesenho: listaDesenho,
            size: size
        }).then(response => {

            setImg(response.data)
8
        }).catch(err => {
            console.error(err)
        }) 

    }

    useEffect(() => {

        getImage()

    },[])

    async function downloadImage() {

        const image = await captureRef(ref, {

            fileName: `canvas${id}`,
            format: 'png', 
            height: size.h,
            width: size.w,
            quality: 1,
            result: 'tmpfile'

        })

        await MediaLibrary.saveToLibraryAsync(image)
        if(image) {
            alert ('saved!')
        }


    }

    const styles = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderColor: 'black',
            width: size.w * u,
            height: size.h * u,
            marginTop: 10,
        }
    })


  return (
    <View >

        <View style={styles.container} collapsable={false}>
            {
                img ? (

                    <Image source={img ? { uri: img } : ''} style={{ flex: 1 }} ref={ref}/>

                ): null
            }   

      
            {/* <Image source={img ? { uri: img } : ''} style={{ flex: 1 }} ref={ref}/> */}
        </View>
        <Button color={'#27272a'} title='Download' onPress={downloadImage}></Button>
        
    </View>


  )
}
