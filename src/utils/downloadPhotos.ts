import axios from "axios";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import { House } from "../types/types";
import { formatFileName } from "./formatFilename";

const PHOTOS_DIRECTORY = "photos";

export const downloadPhoto = async (house: House) => {
  try {
    const response = await axios.get(house.photoURL, { responseType: "arraybuffer" });
    const ext = path.extname(house.photoURL) || ".jpg";
    const formattedFilename = formatFileName(house.id, house.address, ext);
    const filepath = path.join(PHOTOS_DIRECTORY, formattedFilename);

    console.log(`Saving photos in directory: ${path.resolve(PHOTOS_DIRECTORY)}`);

    const optimizedImage = await sharp(response.data)
      .resize(800)
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    fs.writeFileSync(filepath, optimizedImage);
    console.log(`Saved: ${formattedFilename}`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error downloading photo files ${house.photoURL}:`, error.message);
    } else {
      console.error(`Error downloading photo files ${house.photoURL}: Unknown error`);
    }
  }
};
