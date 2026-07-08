const { PDFParse } = require('pdf-parse');
const fs = require('fs');

async function main() {
  try {
    const buffer = fs.readFileSync("../rikzan-el-yasinta-resume-payresume (14).pdf");
    const parser = new PDFParse({ data: new Uint8Array(buffer) });
    const result = await parser.getText();
    console.log(result.text.substring(0, 100));
  } catch(e) {
    console.error(e);
  }
}
main();
