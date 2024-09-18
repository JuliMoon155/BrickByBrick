import React from 'react'
import { FormularioPublicarMaterial } from './FormularioPublicarMaterial'
import { Navegacion } from './Navegacion'
import { SocialPublicarMaterial } from './SocialPublicarMaterial'
import { PreViewPublicarMaterial } from './PreViewPublicarMaterial'
import '../styles/PublicarMaterial.css';


export const PublicarMaterial = () => {
  return (
    <>
      <div className='Formulario'>
        <FormularioPublicarMaterial />
      </div>
      <div className='PreView'>
        <PreViewPublicarMaterial />
      </div>
      <div className='Social'>
        <SocialPublicarMaterial />
      </div>
      <div className='Navegacion'>
        <Navegacion />
      </div>

    </>
  )
}
