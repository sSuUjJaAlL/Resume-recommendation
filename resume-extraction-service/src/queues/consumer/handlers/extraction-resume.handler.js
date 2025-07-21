import { isReplaceSymbol } from "../../../constant/re.constant.js";
import { statusManagementConfig } from "../../../constant/statusManagement.constant.js";
import getPDFImage from "../../../helper/pdfImage.helper.js";
import getTesseractInstance from "../../../helper/tesseract.helper.js";
import extractionLogger from "../../../libs/logger.libs.js";
import { getCVPayload } from "../../../utils/file.utils.js";
import { getRabbitMQChannel } from "../../connection.js";
import publishToElasitcConsumer from "../../publisher/elastic.publisher.js";
import publishToStateManagement from "../../publisher/statusManagement.publisher.js";

async function extractionHandler(message) {
  try {
    if (message) {
      const messageContent = message.content;
      const parseContent = JSON.parse(messageContent.toString());

      extractionLogger.info(
        `Message Received in the Queue : ${JSON.stringify(parseContent)}`
      );

      const { path, id } = parseContent;

      const pdfImageHelper = getPDFImage();
      const tesseractHelper = getTesseractInstance();
      const brokerChannel = await getRabbitMQChannel();

      const cvPath = getCVPayload(path);

      const nonEmptyPages = await pdfImageHelper.extractPDFToImage(cvPath);

      const stateManagmentImagePayload = {
        id: id,
        status: statusManagementConfig["convertImage"],
      };

      await publishToStateManagement(brokerChannel, stateManagmentImagePayload);

      const extractedPayload = {};
      let pageCounter = 1;

      if (Array.isArray(nonEmptyPages) && nonEmptyPages.length > 0) {
        for (const page of nonEmptyPages) {
          const extractedText = await tesseractHelper.extractTextFromImage(
            page
          );
          const pageKey = `page-${pageCounter}`;
          if (!(pageKey in extractedPayload)) {
            extractedPayload[`${pageKey}`] = extractedText;
          }
          pageCounter++;
        }
      }

      const extractedQueuePayload = {
        id: id,
        status: statusManagementConfig["extractText"],
      };

      await publishToStateManagement(brokerChannel, extractedQueuePayload);

      const fullText = Object.values(extractedPayload).join("\n");

      const sectionRegex = {
        experience: /EXPERIENCE\s+([\s\S]*?)(?=\nSKILLS|EDUCATION|PROJECTS)/i,
        skills: /SKILLS\s+([\s\S]*?)(?=\nEDUCATION|PROJECTS|$)/i,
        education: /EDUCATION\s+([\s\S]*?)(?=\nPROJECTS|$)/i,
        projects: /PROJECTS\s+([\s\S]*)/i,
      };

      const result = {};

      for (const [key, regex] of Object.entries(sectionRegex)) {
        const match = fullText.match(regex);
        if (match) {
          if (isReplaceSymbol) {
            const cleaned = match[1]
              .replace(/[\u00AE|\u2022|\beo\b]/g, "")
              .replace(/\n{2,}/g, "\n")
              .trim();
            result[key] =
              key === "projects"
                ? cleaned.split(/\n(?=[A-Z].+)/).filter((p) => p.trim())
                : cleaned;
          } else {
            result[key] = match[1].trim();
          }
        }
      }

      if (!("id" in result)) {
        result["id"] = id;
      }

      await publishToElasitcConsumer(brokerChannel, result);
    }
  } catch (err) {
    extractionLogger.error(
      `Error while hanlding the Extraction Consumer, Error Due To ${err}`
    );
  }
}

export default extractionHandler;
