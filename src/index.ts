import dotenv from "dotenv";
import { fetchHouses } from "./services/fetchHouses";
import { downloadPhoto } from "./utils/downloadPhotos";
import { ensureDirectoryExists } from "./utils/directoryExists";

dotenv.config();

const DIRECTORY_NAME = process.env.DIRECTORY_NAME || "photos";
const TOTAL_PAGES = 10;

const main = async () => {
  ensureDirectoryExists(DIRECTORY_NAME);

  for (let page = 1; page <= TOTAL_PAGES; page++) {
    console.log(`Fetching page ${page}...`);
    const houses = await fetchHouses(page);

    const downloadPromises = houses.map(downloadPhoto);
    await Promise.all(downloadPromises);
  }
  console.log("photos downloaded succesfully!");
};

main();