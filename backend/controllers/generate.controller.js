// notes generate
// credit update
// user model update
import UserModel from "../models/user.model.js";
import { generateGeminiResponse } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import Notes from "../models/notes.model.js";

export const generateNotes = async (req, res) => {
  try {
    // fetch data
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;
    // if topic not present
    if (!topic) {
      return res.status(400).json({ message: "Topic is required" });
    }
    // find user data
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    // check for credits
    if (user.credits < 10) {
      user.isCreditAvailable = false; // set false for credits
      await user.save(); // save user
      return res.status(403).json({ message: "Insufficient credits" });
    }

    // generate prompt
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });
    // gemini response
    const aiResponse = await generateGeminiResponse(prompt);

    // saves notes to notes model
    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram: !!includeDiagram, // force change to boolean
      includeChart: !!includeChart, // froce change to boolean
      content: aiResponse,
    });

    // update user credits
    user.credits -= 10; // deduct 10 credits
    if (user.credits <= 0) user.isCreditAvailable = false;
    // if notes is not array
    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }
    user.notes.push(notes._id); // push notes id to user
    await user.save();

    return res
      .status(200)
      .json({ data: aiResponse, noteId: notes._id, creditsLeft: user.credits });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "AI Generation failed", message: err.message });
  }
};
