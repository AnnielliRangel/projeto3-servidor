import express from "express";
import attachCurrentUser from "../middlewares/attachCurrentUser.js";
import isAuth from "../middlewares/isAuth.js";
import LogModel from "../model/log.model.js";
import ServiceModel from "../model/service.model.js";
import UserModel from "../model/user.model.js";

const serviceRoute = express.Router();

// To create a service
serviceRoute.post(
  "/create-service",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const newService = await ServiceModel.create({
        ...req.body,
        user: req.currentUser._id,
      });

      const userUpdated = await UserModel.findByIdAndUpdate(
        req.currentUser._id,
        {
          $push: {
            services: newService._id,
          },
        },
        { new: true, runValidators: true },
      );

      await LogModel.create({
        user: req.currentUser._id,
        service: newService._id,
        status: "Um novo serviço foi criado!",
      });

      return res.status(201).json(newService);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  },
);

// All Services
serviceRoute.get(
  "/my-services",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const allServices = await ServiceModel.find({
        // user: req.currentUser._id,
      }).populate("user");

      return res.status(200).json(allServices);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  },
);

//Update a service
serviceRoute.put(
  "/edit/:idService",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { idService } = req.params;

      const updatedService = await ServiceModel.findOneAndUpdate(
        { _id: idService },
        { ...req.body },
        { new: true, runValidators: true },
      );

      await LogModel.create({
        user: req.currentUser._id,
        service: idService,
        status: `O serviço "${updatedService.details}" foi atualizado!`,
      });

      return res.status(200).json(updatedService);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  },
);

//To delete a service
serviceRoute.delete(
  "/delete/:idService",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { idService } = req.params;

      //To delete a service
      const deletedService = await ServiceModel.findByIdAndDelete(idService);

      //Removing the ID service from services ARRAY
      await UserModel.findByIdAndUpdate(
        deletedService.user,
        {
          $pull: {
            services: idService,
          },
        },
        { new: true, runValidators: true },
      );

      await LogModel.create({
        service: idService,
        user: req.currentUser._id,
        status: `O Serviço "${deletedService.details}" foi excluído com o status ${deletedService.status}.`,
      });

      return res.status(200).json(deletedService);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  },
);

serviceRoute.put(
  "/discontinued/:idService",
  isAuth,
  attachCurrentUser,
  async (req, res) => {
    try {
      const { idService } = req.params;

      const service = await ServiceModel.findByIdAndUpdate(
        idService,
        { discontinued: true, dateFin: Date.now() },
        { new: true, runValidators: true },
      );

      await LogModel.create({
        user: req.currentUser._id,
        service: idService,
        status: `O serviço "${service.details}" foi descontinuado!`,
      });

      return res.status(200).json(service);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error.errors);
    }
  },
);

//Show all services
serviceRoute.get("/all-services", async (req, res) => {
  try {
    const allServices = await ServiceModel.find({}).populate("user");

    return res.status(200).json(allServices);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.errors);
  }
});

export default serviceRoute;
