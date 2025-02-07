import axios from "axios";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import chalk from "chalk";
import { House } from "../types/types";
import { formatFileName } from "./formatFilename";

const PHOTOS_DIRECTORY = "photos";

export const downloadPhoto = async (house: House) => {
  try {
    const response = await axios.get(house.photoURL, { responseType: "arraybuffer" });
    const ext = path.extname(house.photoURL) || ".jpg";
    const formattedFilename = formatFileName(house.id, house.address, ext);
    const filepath = path.join(PHOTOS_DIRECTORY, formattedFilename);

    console.log(chalk.green(`📸 Saving photos in directory: ${chalk.bold(path.resolve(PHOTOS_DIRECTORY))} 📁`));

    const optimizedImage = await sharp(response.data)
      .resize(800)
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    fs.writeFileSync(filepath, optimizedImage);
    console.log(chalk.blue(`✅ Saved: ${chalk.bold(formattedFilename)}`));

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(chalk.red(`❌ Error downloading photo files ${house.photoURL}: ${error.message}`));
    } else {
      console.error(chalk.red(`❌ Error downloading photo files ${house.photoURL}: Unknown error`));
    }
  }
};