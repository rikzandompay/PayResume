import { extractTextFromPDF } from "./lib/pdf-parser";
import fs from "fs";

async function main() {
  try {
    const buffer = fs.readFileSync("../rikzan-el-yasinta-resume-payresume (14).pdf");
    const text = await extractTextFromPDF(buffer);
    console.log(text.substring(0, 100));
  } catch (e) {
    console.error(e);
  }
}
main();
