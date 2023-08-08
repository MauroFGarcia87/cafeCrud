import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { campoRequerido, rangoPrecio } from "../helpers/helpers";

const EditarProducto = (props) => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState('');
  //crear variables de referencias
  const nombreProductoRef = useRef('');
  const precioProductoRef = useRef(0);

  const URL = process.env.REACT_APP_API_URL + "/" + id;

  useEffect(async () => {
    try {
      //consultar 1 producto en particular, peticion GET
      const respuesta = await fetch(URL);
      // console.log(respuesta);
      if (respuesta.status === 200) {
        const dato = await respuesta.json();
        // console.log(dato)
        setProducto(dato);
        setCategoria(dato.categoria);
      }
    } catch (error) {
      console.log(error);
      //mostrar un mensaje al usuario
    }
  }, []);

  const handleSubmit = async(e)=>{
    e.preventDefault();
    // console.log(nombreProductoRef)
    // console.log(nombreProductoRef.current.value)
    //validar los datos
    if(campoRequerido(nombreProductoRef.current.value) && rangoPrecio(precioProductoRef.current.value) && campoRequerido(categoria)){
      //crear un objeto y enviarlo a la api
      const productoModificado = {
        nombreProducto: nombreProductoRef.current.value,
        precioProducto: precioProductoRef.current.value,
        categoria
      }

      console.log(productoModificado)
      // pedir modificar datos a la api, peticion PUT
      try{
        const respuesta = await fetch(URL,{
          method:"PUT",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(productoModificado)
        })

        console.log(respuesta);
        if(respuesta.status === 200){
          Swal.fire(
            'Producto modificado','EL producto fue correctamente actualizado','success'
          )
          props.consultarAPI();
        }

      }catch(error){
        console.log(error);
        //mostrar msj al usuario
      }
    }else{
      console.log('error al validar los campos')
      //mostrar mensaje de error
    }

  }

  return (
    <Container>
      <h1 className="display-3 text-center my-4">Editar Producto</h1>
      <hr />
      <Form className="my-5" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre del producto*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: café"
            defaultValue={producto.nombreProducto}
            ref={nombreProductoRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="ej: 50"
            defaultValue={producto.precioProducto}
            ref={precioProductoRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Categoria*</Form.Label>
          <Form.Select value={categoria} onChange={(e)=>setCategoria(e.target.value)}>
            <option value="">Seleccione una opcion</option>
            <option value="bebida-caliente">Bebida Caliente</option>
            <option value="bebida-fria">Bebida Fria</option>
            <option value="sandwich">Sandwich</option>
            <option value="dulce">Dulce</option>
            <option value="salado">Salado</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">
          Guardar cambios
        </Button>
      </Form>
    </Container>
  );
};

export default EditarProducto;
