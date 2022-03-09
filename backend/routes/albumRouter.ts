import express, { Request } from "express";
const router = express.Router();
import Album from "../models/albumModel";
import multer from "multer";
import url from "url";

// const upload = multer({ dest: "public/images/" });

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "public/images");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const extension = file.mimetype.split("/")[1];

    cb(
      null,
      `${req.body.name}-${file.originalname}-${Date.now()}.${extension}`
    ); //ablum-photo--date.extension
  },
});

const upload = multer({
  storage: multerStorage,
});

/* Create album */
router.post(
  "/",
  upload.fields([{ name: "coverPage", maxCount: 1 }, { name: "photos" }]),
  (req: Request, res, next) => {
    req.body.coverPage = req.files["coverPage"][0].filename;
    req.body.photos = req.files["photos"].map((file) => file.filename);

    Album.create(req.body).then(() => {
      res.status(201).json({
        status: "success",
      });
    });
  }
);

/* Get album */
router.get("/:id", async (req, res, next) => {
  const data = await Album.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

/* Update album */
router.patch("/:id", async (req, res, next) => {
  const data = await Album.findByIdAndUpdate(req.params.id, req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

/* Delete album */
router.delete("/:id", async (req, res, next) => {
  const data = await Album.findByIdAndDelete(req.params.id);

  if (!data) {
    throw Error("id not exist");
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

/* GET coverpages*/
router.get("/coverages", async (req, res, next) => {
  const CoverPages = await Album.find().select(["id", "name", "coverPage"]);

  console.log(CoverPages);
  res.status(200).json({
    status: "success",
    data: CoverPages,
  });
});

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
