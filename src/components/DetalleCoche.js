import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loadingImage from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";

export default class DetalleCoche extends Component {
  state = {
    coche: null,
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

  componentDidMount = () => {
    this.findCoche();
  };

  componentDidUpdate = (valorAntiguo) => {
    if (valorAntiguo.idCoche != this.props.id) {
      this.findCoche();
    }
  };

  render() {
    return (
      <div>
        <NavLink to="/">Back to list</NavLink>
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
      </div>
    );
  }
}
