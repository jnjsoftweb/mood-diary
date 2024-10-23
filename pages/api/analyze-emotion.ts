import type { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      console.log('Received request:', req.body);
      const { content } = req.body;
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an emotion analyzer. Analyze the given text and return one of the following emotions: happy, sad, angry, excited, or neutral."
          },
          {
            role: "user",
            content: content
          }
        ],
        temperature: 0.7,
        max_tokens: 10,
      });

      const emotion = response.choices[0].message.content?.trim().toLowerCase();
      console.log('Analyzed emotion:', emotion);
      res.status(200).json({ emotion: emotion || 'neutral' });
    } catch (error) {
      console.error('Error in API route:', error);
      res.status(500).json({ error: 'Error analyzing emotion' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
