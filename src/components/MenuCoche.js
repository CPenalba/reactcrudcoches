import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Global from "./Global";

export default class MenuCoche extends Component {
  state = {
    coches: [],
  };

  loadCoches = () => {
    let request = "api/coches";
    let url = Global.apiCoches + request;
    axios.get(url).then((response) => {
      console.log("leyendo coches");
      this.setState({
        coches: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadCoches();
  };

  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-dark bg-dark"
          aria-label="Third navbar example"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              Coches
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarsExample03"
              aria-controls="navbarsExample03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsExample03">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/create">
                    Create
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/detalle">
                    Detalle
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/delete">
                    Delete
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Dropdown
                  </a>
                  <ul className="dropdown-menu">
                    {this.state.coches.map((c, index) => {
                      return (
                        <li key={index}>
                          <NavLink
                            className="dropdown-item"
                            to={"/detalle/" + c.idCoche}
                          >
                            {c.marca}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
