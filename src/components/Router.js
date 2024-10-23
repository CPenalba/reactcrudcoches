import React, { Component } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import HomeCoches from "./HomeCoches";
import MenuCoche from "./MenuCoche";
import CreateCoches from "./CreateCoches";
import DetalleCoche from "./DetalleCoche";
import UpdateCoche from "./UpdateCoche";
import DeleteCoche from "./DeleteCoche";

export default class Router extends Component {
  render() {
    function DetalleCocheElement() {
      let { idcoche } = useParams();
      return <DetalleCoche id={idcoche} />;
    }

    function UpdateCocheElement() {
      let { id, marca, modelo, conductor, imagen } = useParams();
      return (
        <UpdateCoche
          id={id}
          marca={marca}
          modelo={modelo}
          conductor={conductor}
          imagen={decodeURIComponent(imagen)}
        />
      );
    }
    function DeleteCocheElement() {
      let { idcoche } = useParams();
      return <DeleteCoche id={idcoche} />;
    }
    return (
      <BrowserRouter>
        <MenuCoche />
        <Routes>
          <Route path="/" element={<HomeCoches />} />
          <Route path="/create" element={<CreateCoches />} />
          <Route path="/detalle/:idcoche" element={<DetalleCocheElement />} />
          <Route
            path="/update/:id/:marca/:modelo/:conductor/:imagen"
            element={<UpdateCocheElement />}
          />
          <Route path="/delete/:idcoche" element={<DeleteCocheElement />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
