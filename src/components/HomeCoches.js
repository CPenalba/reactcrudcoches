import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import loadingImage from "./../assets/images/loading.jpg";
import { NavLink } from "react-router-dom";

export default class HomeCoches extends Component {
  state = {
    status: false,
    coches: [],
  };

  loadCoches = () => {
    let request = "api/coches";
    let url = Global.apiCoches + request;
    axios.get(url).then((response) => {
      console.log("leyendo coches");
      this.setState({
        coches: response.data,
        status: true,
      });
    });
  };

  componentDidMount = () => {
    this.loadCoches();
  };

  render() {
    if (this.state.status == false) {
      return (
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
      );
    } else {
      return (
        <div>
          <h1>Home coches</h1>
          <table className="table table-bordered table-secondary">
            <thead>
              <tr>
                <th>Id coche</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Conductor</th>
                <th>Imagen</th>
                <th>Eliminar</th>
                <th>Detalles</th>
                <th>Actualizar</th>
              </tr>
            </thead>
            <tbody>
              {this.state.coches.map((coche, index) => {
                return (
                  <tr key={index}>
                    <td>{coche.idCoche}</td>
                    <td>{coche.marca}</td>
                    <td>{coche.modelo}</td>
                    <td>{coche.conductor}</td>
                    <td>
                      <img
                        src={coche.imagen}
                        style={{ width: "150px", height: "150px" }}
                      ></img>
                    </td>
                    <td><NavLink
                        to={"/delete/" + coche.idCoche}
                        className="btn btn-dark"
                      >
                        Delete
                      </NavLink></td>
                    <td>
                      <NavLink
                        to={"/detalle/" + coche.idCoche}
                        className="btn btn-info"
                      >
                        Detalles
                      </NavLink>
                    </td>
                    <td>
                      <NavLink
                        to={
                          "/update/" +
                          coche.idCoche +
                          "/" +
                          coche.marca +
                          "/" +
                          coche.modelo +
                          "/" +
                          coche.conductor +
                          "/" +
                          encodeURIComponent(coche.imagen)
                        }
                        className="btn btn-danger"
                      >
                        Update
                      </NavLink>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
  }
}
