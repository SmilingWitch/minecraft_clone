import {usePlane} from "@react-three/cannon"
import { groundTexture } from "../images/texture"
import { useStore } from "../hooks/useStore"

export  function Ground(){

    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2 ,0,0],
        position: [0,-0.5,0]
    }))

    groundTexture.repeat.set(100,100)

   const [addCube] = useStore( state => [state.addCube])

   const handleClickGround = event => {
    event.stopPropagation()
    const [x,y,z] = Object.values(event.point).map(n => Math.ceil(n))

    if(!event.altKey){
        addCube(x,y,z)
    }

    
   }
    return(
        <mesh
        onClick = {handleClickGround}
        ref = {ref}>
                <planeGeometry attach="geometry" args={[100, 100]}/>
                <meshStandardMaterial attach='material' map = {groundTexture}/>
        </mesh>

    )
}