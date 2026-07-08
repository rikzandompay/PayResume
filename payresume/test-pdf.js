const { PDFParse } = require('pdf-parse');
console.log("PDFParse:", typeof PDFParse);
try {
  const p = new PDFParse({ data: new Uint8Array([0,1,2,3]) });
  console.log("Instantiated!", typeof p.getText);
} catch (e) {
  console.error("Error instantiating", e);
}
