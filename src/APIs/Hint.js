import { OpenAI } from "openai";
import gptDetails from '../data/config.json';

export const generatePrompt = (question, pythonCode) => {
    return question + ". This is what I tried: \n" + pythonCode
        + "\nWithout giving the correct answer, in 2 sentences, "
        + "give me a hint that can help me get it right.";
}

export const sendRequest = async (prompt) => {
    // console.log('Getting a hint...');
    const model = gptDetails.model;
    const apiKey = gptDetails.apiKey;
    
    const openai = new OpenAI({
        apiKey: apiKey,
        dangerouslyAllowBrowser: true
    });
    
    const completion = await openai.chat.completions.create({
        model: model,
        messages: [{ role: "system", content: prompt }]
    });
    
    return completion?.choices[0]?.message?.content 
        || "No hints available at this time. Please try again!";
}