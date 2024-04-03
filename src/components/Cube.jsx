import {useBox} from '@react-three/cannon'
import * as textures from '../images/texture'
import { useState } from 'react'
import {useStore} from "../hooks/useStore"


export default function Cube({id, position,texture}){

    const [isHovered, setIsHovered] = useState(false)
    const [removeCube] = useStore(state => [state.removeCube])

    const [ref] = useBox(() => ({
        type: 'Static',
        position
    }))

    const activeTexture = textures[texture + 'Texture']


   

return(
    <mesh
        onPointerMove={(e) => {
            e.stopPropagation()
            setIsHovered(true)
        }} 
        onPointerOut={(e) => {
            e.stopPropagation()
            setIsHovered(false)
        }}
        onClick={(e) => {
            const {x,y,z} = ref.current.position

            console.log(e.altKey)
            if(e.altKey) {
                removeCube(x,y,z)
            }
        }}
        ref={ref}>
        <boxGeometry attach='geometry'/>
        <meshStandardMaterial 
            color={isHovered ? 'gray': 'white' }
            transparent
            map= {activeTexture}  
            attach='material'/>

    </mesh>
)

}
 
