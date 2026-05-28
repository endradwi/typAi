import OpenAI from 'openai'
import { GoogleGenerativeAI } from '@google/generative-ai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { language = 'English', mode = 'Words', difficulty = 'Medium' } = body || {}

  const openAiKey = process.env.OPENAI_API_KEY
  const openAiBaseURL = process.env.OPENAI_BASE_URL || 'https://api.llm7.io/v1'
  const geminiKey = process.env.GEMINI_API_KEY
  
  if (!openAiKey && !geminiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No API Keys are configured'
    })
  }

  const prompt = `Generate a typing practice text.
Language: ${language}
Format: ${mode === 'Words' ? '30 random words separated by space' : mode === 'Quotes' ? 'A short inspiring quote' : 'A short 3-sentence paragraph'}
Difficulty: ${difficulty}
Rules:
- If Difficulty is Easy: Use lowercase only, no complex punctuation.
- If Difficulty is Medium: Standard capitalization, basic punctuation (comma, period).
- If Difficulty is Hard: Include numbers, complex punctuation, and advanced vocabulary.
- Return ONLY the raw text itself, no markdown formatting, no quotes around the text, no explanations.`

  let generatedText = ''

  try {
    if (!openAiKey) throw new Error('OpenAI key missing, skipping to fallback.')

    const openai = new OpenAI({
      apiKey: openAiKey,
      baseURL: openAiBaseURL
    })

    const completion = await openai.chat.completions.create({
      model: 'gpt-5.4-mini', // using the model you updated to
      messages: [{ role: 'user', content: prompt }]
    })

    generatedText = completion.choices[0].message.content?.trim() || ''
  } catch (openAiError: any) {
    console.warn('OpenAI limit/error reached, falling back to Gemini:', openAiError.message)
    
    if (!geminiKey) {
      throw createError({
        statusCode: 500,
        statusMessage: 'OpenAI generation failed, and GEMINI_API_KEY is not available for fallback.'
      })
    }

    try {
      const genAI = new GoogleGenerativeAI(geminiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' })
      const result = await model.generateContent(prompt)
      const response = await result.response
      generatedText = response.text().trim()
    } catch (geminiError: any) {
      throw createError({
        statusCode: 500,
        statusMessage: `Generation failed. OpenAI error: ${openAiError.message} | Gemini error: ${geminiError.message}`
      })
    }
  }

  return { text: generatedText }
})