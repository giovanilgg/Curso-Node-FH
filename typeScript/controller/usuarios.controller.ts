import { Request, Response } from "express";
import Usuario from "../models/usuario.model";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.status(200).json({
    msj: "get usuarios",
    usuarios,
  });
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findAll({
    where: {
      id,
      estado: "true",
    },
  });
  if (!usuario) {
    return res.status(500).json({
      msj: "El usuario co el id no existe",
    });
  }
  res.status(200).json({
    msj: "get usuario",
    usuario,
  });
};

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  //Combinacion de built y save
  try {
    const usuario = await Usuario.create(body);
    res.status(200).json({
      msj: "post usuarios",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      msj:'no se pudo registrar en la base de datos',
      error
    })
  }
};

export const putUsuario =async (req: Request, res: Response) => {
  const { body } = req;
  const {id}=req.params
  
  try {
    //verificar si existe el usuario
    const usuario= await Usuario.findByPk(id)
    if(!usuario){
      return res.status(404).json({
        msj:"El usuario no se encontro"
      })
    }

    const nuevoUsuario = await usuario.update(body)

    res.status(200).json({
      msj: "put usuarios",
      nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({
      msj:'no se pudo registrar en la base de datos',
      error
    })
  }
};
export const deleteUsuario = async(req: Request, res: Response) => {
  const {id}=req.params
  try {
    //verificar si existe el usuario
    const usuario= await Usuario.findByPk(id)
    if(!usuario){
      return res.status(404).json({
        msj:"El usuario no se encontro"
      })
    }
    //borrado fisico
    await usuario.destroy()
    //borrado logico
    //await usuario.update({estado:"false"})

    res.status(200).json({
      msj: "delete usuario",
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      msj:'no se pudo borrar en la base de datos',
      error
    })
  }
};
