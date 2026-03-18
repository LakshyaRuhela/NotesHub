const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
//  fetch  to generate response from gemini

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    //   if error in response
    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    // for data
    const data = await response.json();

    // console.log("Gemini API raw response:", JSON.stringify(data, null, 2));
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No text returned from Gemini");
    }
    //  clean data
    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(cleanText);
  } catch (err) {
    console.error("Gemini Fetch Error : ", err.message);
    throw new Error("Gemini API fetch Failed");
  }
};
