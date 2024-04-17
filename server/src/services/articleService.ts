import * as cheerio from 'cheerio';
import axios from 'axios';
import { model } from './geminiAI';


async function prepareContentForSummarization(url: string) {
    try {
        const response = await axios.get(url);
        const html = response.data;

        // Use Cheerio to parse the HTML
        const $ = cheerio.load(html);

        // Select text content based on your needs (adjust selectors)
        let textContent = '';
        $('p, h1, h2, h3, h4, h5, h6, li').each((_, element) => {
            textContent += $(element).text().trim() + '\n';
        });

        return textContent;
    } catch (error: any) {
        console.error(`Error preparing content from ${url}:`, error.message);
    }
}

export async function summarizeArticleWithAI(articleOriginalLink: string) {
    try {
        const articleContent = await prepareContentForSummarization(articleOriginalLink);

        const prompt = `Analyze this content and format your response in Markdown:

        * Identify the type (news, opinion, review etc.) and summarize key points.
        * Identify the author of the content.
        * For factual content: highlight evidence and any questionable claims.
        * For opinions: note author background and counter-arguments (if any).
        * For reviews: state subject, sentiment, and reviewer's main points.
        * For recipes: state the recipe, ingredients and instructions.
        * Indicate overall sentiment (positive, negative, neutral).
        * Mention missing crucial information (if applicable).
        The content: ` + articleContent;

        const result = await model.generateContent(prompt)
        const response = await result.response;
        const text = response.text();
        console.log(text);

        const formattedText = text.trim();
        return formattedText;
    } catch (error: any) {
        console.error(`Error summarizing article content from ${articleOriginalLink}`, error.message);
    }
}