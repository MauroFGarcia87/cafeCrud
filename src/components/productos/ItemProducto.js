import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ItemProducto = (props) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>
        {props.producto.nombreProducto}
        <span className="fw-bolder">
          - Precio:$ {props.producto.precioProducto}
        </span>
      </p>
      <div>
        <Link to={`/productos/editar/${props.producto.id}`} className='btn btn-warning me-2'>Editar</Link>
        <Button variant="danger" >
          Borrar
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default ItemProducto;
