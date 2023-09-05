import React, { useState, useEffect, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { campoRequerido, rangoPrecio } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";


const EditarProducto = (props) => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [categoria, setCategoria] = useState("");
  //crear variables de referencias
  const nombreProductoRef = useRef("");
  const precioProductoRef = useRef(0);
  const navegacion = useNavigate();

  const URL = process.env.REACT_APP_API_URL + "/" + id;

  useEffect(() => {
    async function consApi() {
      try {
        //consultar 1 producto en particular, peticion GET
        const respuesta = await fetch(URL);
        //console.log(respuesta);
        if (respuesta.status === 200) {
          const dato = await respuesta.json();
          //console.log(dato)
          setProducto(dato);
          setCategoria(dato.categoria);
        }
      } catch (error) {
        console.log(error);
        //mostrar un mensaje al usuario
      }
    }
    consApi();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Valiadar caompo
    if (
      campoRequerido(nombreProductoRef.current.value) &&
      rangoPrecio(precioProductoRef.current.value) &&
      campoRequerido(categoria)
    ) {
      //Crear el objeto
      const productoModificado = {
        nombreProducto: nombreProductoRef.current.value,
        precioProducto: precioProductoRef.current.value,
        categoria: categoria
      }
      //console.log(productoModificado);
      //Pedir Modificar datos a la API, con peticion Put
      try {
        const respuesta = await fetch(URL, {
          method: "PUT",
            headers: {
              "Content-Type": "application/json"              
            },
            body: JSON.stringify(productoModificado)
          });
          console.log(respuesta);
          if(respuesta.status === 200){
            Swal.fire(
              'Producto Modificado', 'El producto fue correctamente modificado', 'success'
            )
            props.consultarAPI();
            navegacion('/productos'); 
          }
      } catch (error) {
        console.log('Error');
      }

    }else{
      console.log('Error al validar los campos')
    }
  };

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
          <Form.Select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
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
