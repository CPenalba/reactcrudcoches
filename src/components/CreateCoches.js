import React, { Component } from "react";
import Global from "./Global";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default class CreateCoches extends Component {
  cajaId = React.createRef();
  cajaMarca = React.createRef();
  cajaModelo = React.createRef();
  cajaConductor = React.createRef();
  cajaImagen = React.createRef();

  state = {
    status: false,
  };

  insertarCoche = (e) => {
    e.preventDefault();
    let request = "api/Coches/InsertCoche";
    let url = Global.apiCoches + request;

    let id = parseInt(this.cajaId.current.value);
    let marca = this.cajaMarca.current.value;
    let modelo = this.cajaModelo.current.value;
    let conductor = this.cajaConductor.current.value;
    let imagen = this.cajaImagen.current.value;

    let coche = {
      idCoche: id,
      marca: marca,
      modelo: modelo,
      conductor: conductor,
      imagen: imagen,
    };
    axios.post(url, coche).then((response) => {
      this.setState({
        status: true,
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.status == true && <Navigate to="/" />}
        <h1>New coche</h1>
        <form>
          <label>Id coche: </label>
          <input type="text" ref={this.cajaId} className="form-control" />
          <label>Marca coche: </label>
          <input type="text" ref={this.cajaMarca} className="form-control" />
          <label>Modelo coche: </label>
          <input type="text" ref={this.cajaModelo} className="form-control" />
          <label>Conductor coche: </label>
          <input
            type="text"
            ref={this.cajaConductor}
            className="form-control"
          />
          <label>Imagen coche </label>
          <input type="text" ref={this.cajaImagen} className="form-control" />
          <button onClick={this.insertarCoche} className="btn btn-danger">
            Insertar coche
          </button>
        </form>
      </div>
    );
  }
}
