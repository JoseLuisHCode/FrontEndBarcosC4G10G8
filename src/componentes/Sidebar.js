import React from 'react'; 
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <aside className='md:w-60 lg:w-90 px-5 py-10 bg-slate-500'>
        <p className='text-xl font-bold'>Adminstrador</p>
        <Link 
            to={"/crear-categorias"}
            className="bg-violet-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
            >Crear Categorias</Link>

      <div className='py-10'>
      <Link 
            to={"/admin"}
            className="bg-violet-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
            >Admin Categorias</Link>
      </div>
    </aside>
    );
}

export default Sidebar;