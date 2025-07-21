import multer from "multer";
import path from "path";
import fs from "fs";
import matcherLogger from "../libs/logger.libs";

const uploadedFile = path.join("uploads");
const isFileExists = fs.existsSync(uploadedFile);

if (isFileExists) {
  matcherLogger.info(
    `File Does not Exists, Creating the File on the ${uploadedFile}`
  );

  fs.mkdirSync(uploadedFile, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: uploadedFile,
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
});

export default upload;
