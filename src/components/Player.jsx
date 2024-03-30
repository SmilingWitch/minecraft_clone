import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { useRef } from "react";
import {Vector3} from "three"
import { useKeyboard } from "../hooks/useKeyboard";


const CHARACTER_SPEED = 2
const CHARACTER_JUMP_FORCE = 5


export const Player = () => {
    const actions = useKeyboard()
    console.log(actions)

    const {camera} = useThree() 
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0,0.5,0] 
    }))

    const pos = useRef([0,0,0])

    useEffect(() => {
        api.position.subscribe( p => {
            pos.current = p
        })
    }, [api.position])


    const vel = useRef([0,0,0])

    useEffect(() => {
        api.velocity.subscribe( p => {
            vel.current = p
        })
    }, [api.velocity])


    useFrame(() => {
        camera.position.copy( 
            new Vector3(
                pos.current[0],
                pos.current[1],
                pos.current[2]
            )
        )

        const direction = new Vector3()

        const frontVector = new Vector3(
            0,
            0,
            (actions.moveBackward ? 1 : 0) - (actions.moveForward ? 1 : 0)
        )

        const sideVector = new Vector3(
            0,
            0,
            (actions.moveLeft ? 1 : 0) - (actions.moveRight ? 1 : 0) 
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(CHARACTER_SPEED)
            .applyEuler(camera.rotation )

        api.velocity.set(
            direction.x,
            vel.current[1],
            direction.z
        )

        if(actions.jump){
            api.velocity.set(
                vel.current[0],
                CHARACTER_JUMP_FORCE,
                vel.current[2]
            )
        }
    })
    
    return(
        <mesh ref = {ref}/>
    )
    
   
}