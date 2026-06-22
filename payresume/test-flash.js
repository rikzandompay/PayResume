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
  await testModel("gemini-flash-latest");
  await testModel("gemini-3.5-flash");
}

run();
