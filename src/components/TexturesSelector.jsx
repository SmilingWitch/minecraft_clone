import { useStore } from "../hooks/useStore"
import * as images from "../images/images"
import { useKeyboard } from "../hooks/useKeyboard"
import { useEffect, useState } from "react"

export default function TextureSelector(){
    const [visible, setVisible] = useState(false)
    const [texture, setTexture] = useStore(state =>
        [state.texture, state.setTexture])

    const {
        dirt ,
        grass,
        glass,
        wood,
        log
    } = useKeyboard()

    useEffect(() => {
        const options = {
            dirt ,
            grass,
            glass,
            wood,
            log
        }

        const selectedTexture  = Object
        .entries(options)
        .find(([texture, isEnabled]) => isEnabled) 

        if(selectedTexture){
            const [textureName] = selectedTexture
            console.log(textureName)

            console.log(textureName)
            setTexture(textureName)
        }

        
    }, [dirt, grass, glass, wood, log])


}