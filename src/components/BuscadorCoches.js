import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";

export default class BuscadorCoches extends Component {
  cochesAll = [];

  state = {
    cochesDibujo: [],
  };

  buscarCochesMarca = () => {
    const marca = this.props.marca;
    const cochesFiltrados = this.cochesAll.filter((car) =>
      car.marca.includes(marca)
    );

    this.setState({
      cochesDibujo: cochesFiltrados,
    });
  };

  loadCoches = () => {
    const request = "/api/coches";
    const url = Global.apiCoches + request;
    axios.get(url).then((response) => {
      this.cochesAll = response.data;
      this.buscarCochesMarca();
    });
  };

  componentDidMount = () => {
    this.loadCoches();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.marca !== this.props.marca) {
      this.loadCoches();
    }
  }

  render() {
    return (
      <div>
        <h1>Buscador: {this.props.marca}</h1>
        {this.state.cochesDibujo.length != 0 ? (
          <ul>
            {this.state.cochesDibujo.map((c, index) => (
              <li key={index}>Modelos: {c.modelo}</li>
            ))}
          </ul>
        ) : (
          <p>No hay modelos disponibles para esta marca.</p>
        )}
      </div>
    );
  }
}
