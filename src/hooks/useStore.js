import create from 'zustand'
import {nanoid} from 'nanoid'

export const useStore = create(set => ({
    texture: 'dirt',
    cubes: [],
    addCube: (x, y, z) => {
        set(state => ({
            cubes: [...state.cubes, 
                {
                id: nanoid(),
                texture: state.texture,
                pos: [x, y, z,]
            }]
        }))
    },
    removeCube: (x, y, z) => {
        set(state => ({
            cubes: state.cubes.filter(cube =>{
                const [X, Y, Z] = cube.pos
                return X !== x || Y !== y || Z !== z
            })
        }))
    },
    setTexture: (texture) => {
        set({ texture });
    },
    saveWorld: () => {},
    resetWorld : () => {},
}))