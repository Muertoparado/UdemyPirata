import { body } from "express-validator";

const titulo = body("title").trim().notEmpty().withMessage("Title cannot be empty")
    .isString().withMessage("Title must be a string");

const img = body("img").trim().notEmpty().isString().withMessage("Image URL must be a string")
    .withMessage("Image URL cannot be empty");

const descripcion = body("description").trim().notEmpty().withMessage("Description cannot be empty")
    .isString().withMessage("Description must be a string");

const palabrasClave = body("keywords").isArray().withMessage("Keywords must be an array");

const video = body("video").trim().notEmpty().withMessage("Video URL cannot be empty")
    .isString().withMessage("Video URL must be a string");

const links = body("links").isArray().withMessage("Links must be an array");

const idCurso = body("idCurso").withMessage("idCurso cannot be empty")
    .isString().withMessage("idCurso must be a string");

const crearCurso = [titulo, img, descripcion, palabrasClave];
const newModulo = [idCurso, titulo, descripcion, links, video, img];

export { crearCurso, newModulo };
