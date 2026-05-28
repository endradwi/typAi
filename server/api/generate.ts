import OpenAI from 'openai'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { language = 'English', mode = 'Words', difficulty = 'Medium' } = body || {}

  const apiKey = process.env.OPENAI_API_KEY
  const baseURL = process.env.OPENAI_BASE_URL || 'https://api.llm7.io/v1'
  
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OPENAI_API_KEY is not configured'
    })
  }

  const openai = new OpenAI({
    apiKey,
    baseURL
  })

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
    const completion = await openai.chat.completions.create({
      model: 'gpt-5.4-mini', // Update to your preferred model
      messages: [{ role: 'user', content: prompt }]
    })

    const text = completion.choices[0].message.content?.trim() || ''
    
    return { text }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Failed to generate text'
    })
  }
})