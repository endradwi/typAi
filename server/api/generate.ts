import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { language = 'English', mode = 'Words', difficulty = 'Medium' } = body || {}

  const apiKey = process.env.GEMINI_API_KEY
  
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'GEMINI_API_KEY is not configured'
    })
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })

  const prompt = `Generate a typing practice text.
Language: ${language}
Format: ${mode === 'Words' ? '30 random words separated by space' : mode === 'Quotes' ? 'A short inspiring quote' : 'A short 3-sentence paragraph'}
Difficulty: ${difficulty}
Rules:
- If Difficulty is Easy: Use lowercase only, no complex punctuation.
- If Difficulty is Medium: Standard capitalization, basic punctuation (comma, period).
- If Difficulty is Hard: Include numbers, complex punctuation, and advanced vocabulary.
- Return ONLY the raw text itself, no markdown formatting, no quotes around the text, no explanations.`

  try {
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text().trim()
    
    return { text }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to generate text'
    })
  }
})
