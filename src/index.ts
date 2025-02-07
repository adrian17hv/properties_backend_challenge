import dotenv from "dotenv";
import chalk from "chalk";
import { fetchHouses } from "./services/fetchHouses";
import { downloadPhoto } from "./utils/downloadPhotos";
import { ensureDirectoryExists } from "./utils/directoryExists";
import { cleanUpDirectory } from "./utils/cleanUpDirectory";

dotenv.config();

const DIRECTORY_NAME = process.env.DIRECTORY_NAME || "photos";
const TOTAL_PAGES = 10;

const main = async () => {
  console.log(chalk.blueBright("🏠 Starting house photo download process..."));

  await cleanUpDirectory(DIRECTORY_NAME);
  ensureDirectoryExists(DIRECTORY_NAME);

  console.log(chalk.green(`📁 Created directory: ${chalk.bold(DIRECTORY_NAME)}`));


  for (let page = 1; page <= TOTAL_PAGES; page++) {
    console.log(chalk.cyan(`🔍 Fetching page ${page} of ${TOTAL_PAGES}...`));
    try {
      const houses = await fetchHouses(page);
      console.log(chalk.magenta(`Found ${houses.length} houses on page ${page}.`));

      const downloadPromises = houses.map(downloadPhoto);
      await Promise.all(downloadPromises);
      console.log(chalk.green(`✅ Downloaded photos for page ${page}.`));

    } catch (error) {
      console.error(chalk.red(`🚨 Error fetching or downloading photos for page ${page}: ${error}`));
    }

  }

  console.log(chalk.green("🎉 All photos downloaded successfully!"));
};

main();