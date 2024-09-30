import React from 'react'
import '../styles/HeaderPrincipal.css'
import '../styles/Perfil.css'
import fotoPerfil from '../imgTemp/foto.jpeg'

export const Perfil = () => {
  return (
    <div className='contenedorMain'>
      <nav className='elHeader'>
        <ul className='navegar'>
          <li className='elementoSel'>  <a href="#">Perfil</a></li>
          <li className='elemento'><a href="#">Calendario</a></li>
          <li className='elemento'><a href="#">Comunidad</a></li>
          <li className='elemento'><a href="#">Mensajes</a></li>
          <li className='elemento'><a href="#">Notificaciones</a></li>
        </ul>
      </nav>
      <div className='vistaPerfil'>
        <div className='imgCont'><img className='imgUsr' src={fotoPerfil} alt="foto_de_perfil " /></div>
        <div className='nombreUsr'>María Perez</div>
        <div  className='tipoUsr'>Constructora</div>
      </div>
      <div className='despuesIzq'>
        <div className='temp1'><center>AÚN EN PROCESO DE DESARROLLO, DISCULPA LOS INCONVENIENTES :c</center></div>
      </div>
      <div className='despuesCent'>
        <div className='temp'><center>AÚN EN PROCESO DE DESARROLLO, DISCULPA LOS INCONVENIENTES :c</center></div>
      </div>
      <div className='despuesDer'>
        <div className='temp'><center>AÚN EN PROCESO DE DESARROLLO, DISCULPA LOS INCONVENIENTES :c</center></div>
      </div>
    </div>
    // <div className="min-h-screen bg-gray-100">
    //   <nav className="bg-white shadow-md">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //       <div className="flex justify-start h-16">
    //         <div className="flex space-x-8">
    //           <Link href="#" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900">
    //             Inicio
    //           </Link>
    //           <Link href="#" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
    //             Calendario
    //           </Link>
    //           <Link href="#" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
    //             Comunidad
    //           </Link>
    //           <Link href="#" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
    //             Mensajes
    //           </Link>
    //           <Link href="#" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900">
    //             Notificaciones
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   </nav>

    //   <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
    //     <div className="flex flex-col md:flex-row gap-6">
    //       <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg overflow-hidden">
    //         <div className="bg-green-600 h-32 relative">
    //           <div className="absolute -bottom-12 left-4">
    //             <Image
    //               src="/placeholder.svg?height=96&width=96"
    //               alt="Profile"
    //               width={96}
    //               height={96}
    //               className="rounded-full border-4 border-white"
    //             />
    //           </div>
    //         </div>
    //         <div className="p-4 pt-16">
    //           {/* Add profile content here */}
    //         </div>
    //       </div>
    //       <div className="w-full md:w-1/2 bg-white shadow-md rounded-lg p-6">
    //         {/* Add main content here */}
    //       </div>
    //       <div className="w-full md:w-1/4 bg-white shadow-md rounded-lg p-6">
    //         {/* Add sidebar content here */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

