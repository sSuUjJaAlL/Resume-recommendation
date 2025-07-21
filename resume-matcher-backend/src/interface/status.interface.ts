type StatusEnums = "PROCESSING" | "UPLOADED" | "SAVE IN MONGO DATABASE";

interface IStatusSchema {
  fileName: string;
  fileMimeType: string;
  fileEncoding: string;
  fileSize: number;
  status: StatusEnums;
}

export { IStatusSchema };
