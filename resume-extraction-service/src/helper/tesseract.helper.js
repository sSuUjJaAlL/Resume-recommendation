import { createWorker } from "tesseract.js";
import extractionLogger from "../libs/logger.libs.js";

class TesseractHelper {
  async extractTextFromImage(path) {
    const worker = await createWorker("eng");
    try {
      const response = await worker.recognize(path);
      const responseText = response.data.text;
      return responseText;
    } catch (err) {
      extractionLogger.error(`Error Extracting the Text From the Image`);
    } finally {
      await worker.terminate();
    }
  }
}

const getTesseractInstance = () => {
  return new TesseractHelper();
};

export default getTesseractInstance;
