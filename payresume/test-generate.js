const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello");
    console.log(`${modelName}: SUCCESS - ${result.response.text().trim()}`);
  } catch (error) {
    console.log(`${modelName}: ERROR - ${error.message.split('\n')[0]}`);
  }
}

async function run() {
  await testModel("gemini-3.1-pro-preview");
  await testModel("gemini-3-pro-preview");
  await testModel("gemini-2.5-pro");
  await testModel("gemini-2.5-flash");
}

run();
