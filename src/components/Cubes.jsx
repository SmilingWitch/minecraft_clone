import Cube from "./Cube"
import {useStore} from '../hooks/useStore'



export default function Cubes(){
    const [cubes] = useStore(state => [state.cubes])

    return cubes.map(({id, pos, texture}) => {
        return <Cube key = {id} position = {pos} texture = {texture} />
    })
}