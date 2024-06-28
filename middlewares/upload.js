import multer from "multer";
import path from "path";
import { nanoid } from "nanoid";

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const filename = `${nanoid()}_${file.originalname}`;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.originalname.split(".").pop() === "exe") {
    cb(new Error("File extension not supported"));
  }
  cb(null, true);
};

const limits = {
  fileSize: 3 * 1024 * 1024,
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
