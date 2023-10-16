import React, { useEffect } from 'react'
import { View } from 'react-native'
import Canvas from './Canvas'
import preparoListaCorte from '../functions/preparoListaCorte'
import corte from '../functions/corte'

export default function (props) {

    let { listaCanvas, listaCorte, espaçosVazios, cutClick, direcaoCorte } = props
    

    useEffect(() => {

        preparoListaCorte(listaCorte, direcaoCorte)

        if(espaçosVazios.length >= 0) {

            espaçosVazios.map((chapa) => {

                corte(listaCorte, chapa, listaCanvas,direcaoCorte)
                listaCorte = listaCorte.filter(peca => peca.cortado === false)

            })

        }
        
        while(listaCorte.length > 0) {

            let chapa = [{w: 2750 , h:1850 , x:0, y: 0, peca: false}]
            espaçosVazios.push(chapa)
            corte(listaCorte, chapa, listaCanvas, direcaoCorte)

            listaCorte = listaCorte.filter(peca => peca.cortado === false)

        }


    }, [cutClick])

  return (
    <View>
        {listaCanvas.map((listaDesenho) => (
            <Canvas key={listaCanvas.indexOf(listaDesenho)} id={listaCanvas.indexOf(listaDesenho)} listaDesenho={listaDesenho.desenhos} size={listaDesenho.size} />
        ))}
    </View>
  )
}
