import express from "express";

import * as albumController from "../controllers/albumController";

const router = express.Router();
// const upload = multer({ dest: "public/images/" });

// const multerStorage = multer.diskStorage({
//   destination: (req: Request, file: Express.Multer.File, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req: Request, file: Express.Multer.File, cb) => {
//     const extension = file.mimetype.split("/")[1];

//     cb(
//       null,
//       `${req.body.name}-${file.originalname}-${Date.now()}.${extension}`
//     ); //ablum-photo--date.extension
//   },
// });

// const upload = multer({
//   storage: multerStorage,
// });

/* Create album */
router.post(
  "/",
  albumController.uploadAlbumImages,
  albumController.createAlbum
);

/* GET coverpages*/
router.get("/coverpages", albumController.getCoverPages);

router
  .route("/:id")
  .get(albumController.getAlbum)
  .patch(albumController.uploadAlbumImages, albumController.updateAlbum)
  .delete(albumController.deleteAlbum);

// /* Get album */
// router.get("/:id", async (req, res, next) => {
//   const data = await Album.findById(req.params.id);

//   res.status(200).json({
//     status: "success",
//     data: data,
//   });
// });

// /* Update album */
// router.patch("/:id", async (req, res, next) => {
//   const data = await Album.findByIdAndUpdate(req.params.id, req.body);

//   res.status(200).json({
//     status: "success",
//     data: data,
//   });
// });

// /* Delete album */
// router.delete("/:id", async (req, res, next) => {
//   const data = await Album.findByIdAndDelete(req.params.id);

//   if (!data) {
//     throw Error("id not exist");
//   }

//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });

export default router;

/* Create album */
//  POST: /api/v1/albums
// {
//   name:'test'
//   coverPageIndex: 0,
//   photos: [test-123.jpg-313.jpeg],
// }

/* Get album */
//  GET: /api/v1/albums/:name
// {
//   name:'test'
//   coverPageIndex: 0,
//   photos: [test-123.jpg-313.jpeg],
// }

/* Delete album */
//  Delete: /api/v1/albums/:name

/* Get coverpages*/
//  GET: /api/v1/albums/coverages

/* Update Photo*/
//  PATCH: /api/v1/albums/:name/photo/:id

/* Create Photo*/
//  POST: /api/v1/albums/:name/photo/:id

/* Delete Photo*/
//  DELETE: /api/v1/albums/:name/photo/:id
