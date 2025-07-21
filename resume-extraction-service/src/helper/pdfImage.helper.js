import path from "node:path";
import { promises as fs } from "node:fs";
import { pdf } from "pdf-to-img";
import fsNotPromise from "fs";
import PDFUtilsHelper from "./pdfUtils.helper.js";

class PDFImageHelper extends PDFUtilsHelper {
  imageFilePath = path.join(process.cwd(), "extractedPhoto");

  constructor() {
    super();
    if (!fsNotPromise.existsSync(this.imageFilePath)) {
      fsNotPromise.mkdirSync(this.imageFilePath, { recursive: true });
    }
  }

  async extractPDFToImage(prefixPath) {
    const emptyPages = [];
    const nonEmptyPages = [];
    let counter = 1;
    const document = await pdf(prefixPath, { scale: 3 });
    for await (const image of document) {
      const finalPath = path.join(this.imageFilePath, `page${counter}.png`);
      await fs.writeFile(finalPath, image);
      const isBlank = await this.isBlankWhiteImage(finalPath);
      if (isBlank) {
        emptyPages.push(finalPath);
      } else {
        nonEmptyPages.push(finalPath);
      }
      counter++;
    }

    if (Array.isArray(emptyPages) && emptyPages.length > 0) {
      for (const page of emptyPages) {
        await fs.unlink(page);
      }
    }
    return nonEmptyPages;
  }
}

const getPDFImage = () => {
  return new PDFImageHelper();
};

export default getPDFImage;
