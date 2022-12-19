import React, { useEffect, useState }  from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar'; 
import crud from '../../conexiones/crud';
import { Link, useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert'; 

const ActualizarProductos = () => {
    
  const navigate = useNavigate(); 

  const {idProducto} = useParams();
   // console.log(idProducto);
    
    const [producto1, setProducto] = useState({
        nombre: '',
        descripcion: '',
        stock: '',
        precio: '',
        imagen: '',
        

      })

      let { nombre, descripcion, stock, precio,imagen } = producto1;   


      const cargarProducto = async () =>{
        console.log(idProducto)
        const response = await crud.GET(`/api/producto/act/${idProducto}`);

        console.log(response);
        setProducto(response.producto1);
      }
      useEffect(() =>{ 
        cargarProducto();
      },[]);

           
      
      const onChange = (e) =>{
        setProducto({
          ...producto1,
          [e.target.name]: e.target.value
        })
      }

      const actualizarProducto = async () =>{
        const data = {
            nombre: producto1.nombre,
            descripcion: producto1.descripcion,
            stock: producto1.stock,
            precio: producto1.precio,
            imagen: producto1.imagen,
            
        }
       console.log(data, idProducto);
          const response = await crud.PUT(`/api/producto/${idProducto}`, data);
          console.log(response);
          const mensaje1 = "El producto se actualizo correctamente";
          swal({
            title:'Información',
            text: mensaje1,
            icon: 'success',
            buttons:{
              confirm:{
                text: 'OK',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
              }
            }
          });
          navigate(`/home-productos/${producto1.categoriaId}`);
         
      }
    
      const onSubmit = (e) => {
        e.preventDefault();
        actualizarProducto();
      }
      
     
      
  return (
    <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
        <main className='flex-1'>
        <div className='mt-10 flex justify-center'>
        <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
              Actualizar Producto
            </h1>
        </div>
        
        <form 
              className='my-10 bg-white shadow rounded-lg p-10 '
              onSubmit={onSubmit}
            >
              <div className='my-5'>
                <label className='uppercase text-gray-600 block text-xl font-bold' >Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={nombre}
                  onChange={onChange}
                />
                <label className='uppercase text-gray-600 block text-xl font-bold' >descripción</label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  placeholder='descripcion'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                 value={descripcion}
                  onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  placeholder='stock'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={stock}
                  onChange={onChange}
                />

                <label className='uppercase text-gray-600 block text-xl font-bold' >precio</label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  placeholder='precio'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={precio}
                  onChange={onChange}
                />

              <label className='uppercase text-gray-600 block text-xl font-bold' >Imagen</label>
                <input
                  type="text"
                  id="imagen"
                  name="imagen"
                  placeholder='Nombre'
                  className='w-full mt-3 p-3 border rounded-lg bg-gray-50'
                  value={imagen}
                  onChange={onChange}
                />
              </div>

              <input 
                type="submit"
                value="Actualizar Producto"
                className="bg-violet-600 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-violet-400 transition-colors"
            />

            </form>
        </main>
      </div>
      
      
      </>
    );
}

export default ActualizarProductos;