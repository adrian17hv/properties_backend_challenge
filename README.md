# House Photo Downloader

**House Photo Downloader** is a script that fetches house data from an API and downloads images while optimizing them for storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technical Choices](#technical-choices)

## Installation

To get started, follow these steps to ensure you're using the correct version of Node.js and to install the required dependencies.

### Step 0: Install and Use NVM (Node Version Manager)

1. **Install NVM**  
   Follow the instructions to install NVM from the official [NVM GitHub page](https://github.com/nvm-sh/nvm) for your platform.

2. **Install Node.js**  
   After installing NVM, use it to install the required version of Node.js:

   ```bash
   nvm install
   ```

3. **Use the Installed Node.js Version**  
   Switch to the installed version:

   ```bash
   nvm use
   ```

4. **Verify Node.js Installation**  
   Ensure that the correct version of Node.js is active:

   ```bash
   node -v
   ```

### Step 1: Install Dependencies

Install the dependencies with npm:

```bash
npm install
```

This will install all the required packages defined in the `package.json`.

### Step 2: Configure Environment Variables

Create a `.env` file in the root directory and define the following environment variable:

```env
API_PHOTOS_URL=your_api_endpoint
```

### Step 3: Run the Script

To fetch and download house images, run:

```bash
npx ts-node src/index.ts
```

## Usage

Once the script is running, it will:

1. Fetch house data from the HomeVision API.
2. Download and optimize the house images.
3. Save the images to a specified directory.

## Technical Choices

### **Axios**

**Axios** is used to handle HTTP requests for fetching house data efficiently.

### **Sharp**

**Sharp** is used to optimize images by resizing and compressing them, reducing file size while maintaining quality.

### **FS (File System Module)**

The **fs** module is used to handle file operations such as saving images to the local directory.

### **Dotenv**

**Dotenv** is used to manage environment variables, making configuration more flexible.

### **Chalk**

**Chalk** is used to enhance console messages with colors, improving readability and making logs more visually appealing.