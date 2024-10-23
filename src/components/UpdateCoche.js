import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default class UpdateCoche extends Component {
  cajaId = React.createRef();
  cajaMarca = React.createRef();
  cajaModelo = React.createRef();
  cajaConductor = React.createRef();
  cajaImagen = React.createRef();

  state = {
    status: false,
  };

  updateCoche = (e) => {
    e.preventDefault();
    let id = parseInt(this.cajaId.current.value);
    let marca = this.cajaMarca.current.value;
    let modelo = this.cajaModelo.current.value;
    let conductor = this.cajaConductor.current.value;
    let imagen = this.cajaImagen.current.value;
    let request = "api/Coches/UpdateCoche";
    let url = Global.apiCoches + request;
    let coche = {
      idCoche: id,
      marca: marca,
      modelo: modelo,
      conductor: conductor,
      imagen: imagen,
    };
    axios.put(url, coche).then((response) => {
      this.setState({
        status: true,
      });
    });
  };

  render() {
    return (
      <div>
        {this.state.status == true && <Navigate to="/" />}
        <h1>Update coche</h1>
        <NavLink to="/">Back to index</NavLink>
        <form>
          <label>Id coche: </label>
          <input
            type="text"
            ref={this.cajaId}
            className="form-control"
            defaultValue={this.props.id}
            disabled
          />
          <label>Marca coche: </label>
          <input
            type="text"
            ref={this.cajaMarca}
            className="form-control"
            defaultValue={this.props.marca}
          />
          <label>Modelo coche: </label>
          <input
            type="text"
            ref={this.cajaModelo}
            className="form-control"
            defaultValue={this.props.modelo}
          />
          <label>Conductor coche: </label>
          <input
            type="text"
            ref={this.cajaConductor}
            className="form-control"
            defaultValue={this.props.conductor}
          />
          <label>Imagen coche </label>
          <input
            type="text"
            ref={this.cajaImagen}
            className="form-control"
            defaultValue={this.props.imagen}
          />
          <button onClick={this.updateCoche} className="btn btn-danger">
            Actualizar coche
          </button>
        </form>
      </div>
    );
  }
}
