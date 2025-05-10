import multer from 'multer';
import PdfDetails from '../models/PdfDetails.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export const upload = multer({ storage });

export const uploadFile = async (req, res, next) => {
  try {
    const { title } = req.body;
    const pdf = req.file.filename;
    await PdfDetails.create({ title, pdf });
    res.send({ status: 200 });
  } catch (err) {
    next(err);
  }
};

export const getFiles = async (req, res, next) => {
  try {
    const data = await PdfDetails.find({});
    res.send({ status: 200, data });
  } catch (err) {
    next(err);
  }
};