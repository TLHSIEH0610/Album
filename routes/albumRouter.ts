import express from "express";
const router = express.Router();

/* GET album-coverpage list */
router.get("/api/v1/", function (req, res, next) {
  res.status(200).json({
    status: "success",
  });
});

/* GET album list */
router.get("/api/v1/:album", function (req, res, next) {
  res.status(200).json({
    status: "success",
  });
});

export default router;
