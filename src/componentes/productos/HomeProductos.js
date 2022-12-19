import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate, useParams} from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import crud from '../../conexiones/crud';
import swal from 'sweetalert'; 
import ViewProductos from './ViewProductos';

const HomeProductos = () => {
  
  const navigate = useNavigate(); 

  const {idCategoria} = useParams();

  useEffect(() =>{
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("token")
      //console.log(token)
      if(!token){
        navigate("/login");
      }
    }
    autenticarUsuario()
  },[navigate]);// [] hacen que solo se ejecute una vez el useEffect


  
    const [producto, setProductos] = useState([]);
  
    const cargarProductos = async () => {
      const response = await crud.GET(`/api/producto/${idCategoria}`);
      //console.log(response);
      setProductos(response);
    }
  //console.log(productos);
    useEffect(() => {
      cargarProductos();
    },[]);


    const borrarProducto = async (idProducto) =>{
      swal({
        title: "Estas seguro de eliminar el producto?",
        text: "una vez eliminado, no se podra recuperar este producto",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          const response = crud.DELETE(`/api/producto/${idProducto}`);
          
          if(response){
            swal("Tu producto borrado correctamente", {
              icon: "success",
            });
          }
          cargarProductos();
         
        } else {
          swal("se cancelo la acción");
        }
      });
     }

  return (
      <>
      <Header/>
      <div className='md:flex md:min-h-screen'>
        <Sidebar/>
            <main className= 'flex-1'>
              <div className='mt-10 flex justify-center'>
              <h1 className="inline bg-gradient-to-r from-indigo-200 via-violet-700 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                Listado de Productos
                </h1>
                </div>  
                <div className='p-12'>
              <Link
                to={`/crear-producto/${idCategoria}`}
                className='bg-violet-600 w-full p-3 text-white uppercase font-bold mt-5 text-center rounded-lg'
              >Crear Producto</Link>
            </div>
              
      <table className="table table-bordered">

        <thead className='bg-white'>
            <tr>
                <th style={{ width: '18%' }}>Imagen</th>
                <th style={{ width: '18%' }}>Nombre</th>
                <th style={{ width: '18%' }}>Descripcion</th>
                <th style={{ width: '18%' }}>Stock</th>
                <th style={{ width: '18%' }}>Precio</th>
                <th style={{ width: '18%' }}>Opciones</th>
            </tr>
        </thead>
        
        <tbody className="bg-white">
            {
                producto.map(
                    item =>
                        <tr key={item._id}>
                            <td><img src={item.imagen}></img></td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td>{item.stock}</td>
                            <td>{item.precio}</td>
                            <td>
                                
                                <Link 
                                 to={`/actualizar-producto/${item._id}`}

                                >Editar</Link>&nbsp;&nbsp;
                                <button  
                                    onClick={()=>borrarProducto(item._id)}
                                >Eliminar</button>
                            </td>
                        </tr>
                        )
                    }
        </tbody>
      </table>

            </main>
        </div>   

</>
    );
}

export default HomeProductos;