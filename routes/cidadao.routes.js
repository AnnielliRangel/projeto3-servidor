import express from "express";
//import TaskModel from '../model/task.model.js';

import isAuth from "../middlewares/isAuth.js";

import CidadaoModel from "../model/cidadao.model.js";
const cidadaoRoute = express.Router();
//
// ! sort acessibilidade, mudar 'nenhuma'-> " - "
//
cidadaoRoute.get("/all-cidadaos", isAuth, async (req, res) => {
  try {
    const filter = {};
    const projection = { createdAt: 0 };
    const sort = {
      updatedAt: 1,
    };

    const cidadaos = await CidadaoModel.find({
      filter,
      projection,
      sort,
    }).populate("acessos");

    //console.log(cidadaos, 'cidadaos');

    return res.status(200).json(cidadaos);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});
//
// ! reincluir isAuth
cidadaoRoute.post("/create-cidadao/", async (req, res) => {
  try {
    const newCidadao = await CidadaoModel.create({ ...req.body });

    return res.status(201).json(newCidadao);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});
//
//
// //
cidadaoRoute.get("/oneCidadao/:cidadaoID", isAuth, async (req, res) => {
  try {
    const { cidadaoID } = req.params;

    const cidadao = await CidadaoModel.findOne({ _id: cidadaoID}).populate("acessos")

    if (!cidadao) {
      return res.status(400).json({ msg: "Cidadão não encontrado!" });
    }

    return res.status(200).json(cidadao);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});


// Rotas para Update de delete. Ass.: Bruno Prestes
cidadaoRoute.put("/edit/:id", isAuth, async (req, res) => {
  try {
    //buscar o id do registro a ser editado
    const { id } = req.params

    const updatedUser = await CidadaoModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true },
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

cidadaoRoute.delete("/delete/:id", isAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await CidadaoModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(400).json({ msg: "Cidadao não encontrado!" });
    }

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.errors);
  }
});

export default cidadaoRoute;
/*
 */
