import { useStore } from "../hooks/useStore"
import * as images from "../images/images"
import { useKeyboard } from "../hooks/useKeyboard"
import { useEffect, useState } from "react"

export default function TextureSelector(){
    const [visible, setVisible] = useState(true)
    const [texture, setTexture] = useStore(state =>
        [state.texture, state.setTexture])

    const {
        dirt ,
        grass,
        glass,
        wood,
        log
    } = useKeyboard()

    {/*useEffect(() => {
        const visibilityTimeout = setTimeout(() => {
            setVisible(false)
        }, 1000)
        setVisible(true)

        return () => {
            clearTimeout(visibilityTimeout)
        }
    },[texture] )*/}

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

            setTexture(textureName)
        }

        
    }, [dirt, grass, glass, wood, log])

    if(!visible) return null

    return(
        <div className="imagesBx" >
            {
              Object.entries(images).map(([imgKey, img]) => {
                return <img
                className={texture === imgKey.replace('Img', '') ? 'selected' : ''}
                    key = {imgKey}
                    src = {img}
                    alt = {imgKey}
                    />

              })  
            }
        </div>
    )
}