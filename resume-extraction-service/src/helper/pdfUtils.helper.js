import sharp from "sharp";
import extractionLogger from "../libs/logger.libs.js";

class PDFUtilsHelper {
  async isBlankSpace(imageBuffer) {
    const { data, info } = await sharp(imageBuffer)
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }

    const avg = sum / data.length;

    return avg > 250;
  }

  as;
  async isBlankWhiteImage(imagePath) {
    try {
      const image = sharp(imagePath);
      const { data, info } = await image
        .raw()
        .toBuffer({ resolveWithObject: true });

      for (let i = 0; i < data.length; i += info.channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = info.channels === 4 ? data[i + 3] : 255;

        if (!(r === 255 && g === 255 && b === 255 && a === 255)) {
          return false;
        }
      }

      return true;
    } catch (err) {
      extractionLogger.error("Error checking image:", err);
      return false;
    }
  }
}

export default PDFUtilsHelper;
