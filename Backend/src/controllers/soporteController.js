import Soporte from '../models/soporte.model.js';

export const createMessage = async (req, res) => {
  try {
    const nuevo = new Soporte(req.body);
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const mensajes = await Soporte.find();
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessageById = async (req, res) => {
  try {
    const mensaje = await Soporte.findById(req.params.id);
    if (!mensaje) return res.status(404).json({ message: 'No encontrado' });
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const eliminado = await Soporte.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
