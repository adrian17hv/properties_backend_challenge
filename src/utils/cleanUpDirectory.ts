import { rm } from "fs/promises";
import fs from "fs";
import chalk from "chalk";

export const cleanUpDirectory = async (dir: string) => {
  if (fs.existsSync(dir)) {
    try {
      await rm(dir, { recursive: true, force: true });
      console.log(chalk.green(`🧹 Directory ${chalk.bold(dir)} removed successfully`));
    } catch (error) {
      console.error(chalk.red(`🔥 Error removing directory ${chalk.bold(dir)}`));
    }
  } else {
    console.log(chalk.yellow(`⚠️ Directory ${chalk.bold(dir)} does not exist, skipping cleanup.`));
  }
};