import {Canvas} from '@react-three/fiber'
import {Sky} from '@react-three/drei'
import {Physics} from '@react-three/cannon'
import { Ground } from './components/Ground'
import { FPV as Fpv } from './components/FPV'
import { Player } from './components/Player'
import React from 'react';
import Cubes from "./components/Cubes"
import TextureSelector from './components/TexturesSelector'




function App() {

  class ErrorBoundary extends React.Component {
    constructor(props) {
       super(props);
       this.state = { hasError: false };
    }
   
    static getDerivedStateFromError(error) {
       // Actualiza el estado para que el siguiente renderizado muestre la UI de respaldo.
       return { hasError: true };
    }
   
    componentDidCatch(error, info) {
       // Puedes registrar el error en un servicio de análisis aquí.
       console.error("Error capturado:", error, info);
    }
   
    render() {
       if (this.state.hasError) {
         // Puedes renderizar cualquier UI de respaldo personalizada.
         return <h1>Algo salió mal.</h1>;
       }
   
       return this.props.children;
    }
   }


  return (

    <ErrorBoundary>
      <>
    <Canvas>
      <Sky sunPosition={[100,100,20]}/>
      <ambientLight intensity={1.2}/>
      <Fpv/>
      
      <Physics>
        <Cubes/>
        <Player/>
        <Ground/>
      </Physics>
    </Canvas>
    
    <div className= "pointer">+</div>
    <TextureSelector/>
    </>
  </ErrorBoundary>


  )
}

export default App
