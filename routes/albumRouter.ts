import express from "express";
const router = express.Router();
import Album from "../models/albumModel";
import multer from "multer";

// const upload = multer({ dest: "public/images/" });

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
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

// upload.fields([{ name: "coverPage", maxCount: 1 }, { name: "photos" }]);

/* Create album */
router.post(
  "/",
  upload.fields([{ name: "coverPage", maxCount: 1 }, { name: "photos" }]),
  (req, res, next) => {
    console.log(req.files);
    //@ts-ignore
    req.body.coverPage = req.files.coverPage[0].originalname;
    //@ts-ignore
    req.body.photos = req.files.photos.map((file) => file.originalname);
    console.log("files", req.files);
    Album.create(req.body).then(() => {
      res.status(200).json({
        status: "success",
      });
    });
  }
);

/* Get album */
router.get("/", async (req, res, next) => {
  // const  Album.find()
});

/* Delete album */

router.delete("/", upload.single("photos"), (req, res, next) => {});

/* GET coverpages*/
router.get("/coverages", async (req, res, next) => {
  const CoverPages = await Album.find().select(["id", "name", "coverPage"]);

  console.log(CoverPages);
  res.status(200).json({
    status: "success",
    data: CoverPages,
  });
});

/* GET album list */
router.get("/api/v1/:album", function (req, res, next) {
  res.status(200).json({
    status: "success",
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
