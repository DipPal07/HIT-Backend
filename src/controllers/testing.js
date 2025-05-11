import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Needed to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendfileto = (req, res) => {
  try {
    const filePath = path.join(
      __dirname,
      "/public/uploads/syllabusAndClassRoutine/pdf-1746948048094-928191292mm.png"
    );
    console.log(__dirname);

    res.sendFile(filePath);
    console.log(filePath);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { sendfileto };
