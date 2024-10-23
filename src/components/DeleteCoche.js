import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loadingImage from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default class DeleteCoche extends Component {
  state = {
    coche: null,
    status: false,
    modal: false,
  };

  findCoche = () => {
    let id = this.props.id;
    let request = "api/Coches/FindCoche/" + id;
    var url = Global.apiCoches + request;
    axios.get(url).then((response) => {
      this.setState({
        coche: response.data,
      });
    });
  };

  deleteCoche = () => {
    let id = this.props.id;
    let request = "api/Coches/DeleteCoche/" + id;
    let url = Global.apiCoches + request;
    axios.delete(url).then((response) => {
      console.log("Delete...");
      this.setState({
        status: true,
      });
    });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  // Cierra el modal sin eliminar
  hideModal = () => {
    this.setState({ showModal: false });
  };

  // Confirma la eliminación
  confirmDelete = () => {
    this.setState({ showModal: false });
    this.deleteCoche();
  };
  componentDidMount = () => {
    this.findCoche();
  };

  render() {
    return (
      <div>
        <NavLink to="/">Back to list</NavLink>
        {this.state.status == true && <Navigate to="/" />}
        {this.state.coche ? (
          <ul className="list-group">
            <li className="list-group-item">
              Id coche: {this.state.coche.idCoche}
            </li>
            <li className="list-group-item">Marca: {this.state.coche.marca}</li>
            <li className="list-group-item">
              Modelo: {this.state.coche.modelo}
            </li>
            <li className="list-group-item">
              Conductor: {this.state.coche.conductor}
            </li>
            <li className="list-group-item">
              Imagen:{" "}
              <img
                src={this.state.coche.imagen}
                style={{ width: "150px", height: "150px" }}
              ></img>
            </li>
          </ul>
        ) : (
          <img
            src={loadingImage}
            alt="Loading..."
            style={{
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "5%",
            }}
          />
        )}
        <button onClick={this.showModal}>Delete coche</button>

        {this.state.showModal && (
          <div>
            <h4>Are you sure you want to delete this coche?</h4>
            <button onClick={this.confirmDelete} className="btn btn-dark">
              Yes
            </button>
            <button onClick={this.hideModal} className="btn btn-danger">
              No
            </button>
          </div>
        )}
      </div>
    );
  }
}
