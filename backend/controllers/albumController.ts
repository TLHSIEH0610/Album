import { Request } from "express";
import Album from "../models/albumModel";
import multer from "multer";
import { catchAsync } from "../utils/catchAsync";
import AppError from "../utils/appError";

const multerStorage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "public/images");
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const extension = file.mimetype.split("/")[1];

    cb(
      null,
      `${req.body.name || req.params.id}-${
        file.originalname
      }-${Date.now()}.${extension}`
    ); //ablum-photo--date.extension
  },
});

const upload = multer({
  storage: multerStorage,
});

export const uploadAlbumImages = upload.fields([
  { name: "coverPage", maxCount: 1 },
  { name: "photos" },
]);

export const createAlbum = catchAsync(async (req: Request, res, next) => {
  req.body.coverPage = req.files["coverPage"][0].filename;
  req.body.photos = req.files["photos"].map((file) => file.filename);

  Album.create(req.body).then(() => {
    res.status(201).json({
      status: "success",
    });
  });
});

export const getAlbum = catchAsync(async (req, res, next) => {
  const data = await Album.findById(req.params.id);

  if (!data) {
    return next(new AppError("Not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: data,
  });
});

export const deleteAlbum = catchAsync(async (req, res, next) => {
  const data = await Album.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const updateAlbum = catchAsync(async (req, res, next) => {
  // console.log(req.params.id, req.body);
  let data;

  //add images
  if (req.files) {
    console.log(req.body);
    req.body.photos = req.files["photos"].map((file) => file.filename);
    data = await Album.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          photos: req.body.photos,
        },
      }
    );
  }
  //delete images
  else {
    data = await Album.findByIdAndUpdate(req.params.id, req.body);
  }
  console.log("data", data);

  if (!data) {
    throw Error("id not exist");
  }

  res.status(204).json({
    status: "success",
    data: data,
  });
});

export const getCoverPages = catchAsync(async (req, res, next) => {
  const CoverPages = await Album.find().select(["_id", "name", "coverPage"]);

  res.status(200).json({
    status: "success",
    data: CoverPages,
  });
});
