import Notes from "../models/notes.model.js";
// function to get all notes
export const getMyNotes = async (req, res) => {
  try {
    // find notes of curr user
    const notes = await Notes.find({ user: req.userId })
      .select(
        "topic classLevel examType revisionMode includeDiagram includeChart createdAt",
      )
      .sort({ createdAt: -1 }); // sorted by created first come first
    //   if notes not present
    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `getCurrentUser notes error  ${error}` });
  }
};

// for single notes
export const getSingleNotes = async (req, res) => {
  try {
    // find perticular notes id
    const notes = await Notes.findOne({
      _id: req.params.id,
      user: req.userId,
    });
    // if notes not found
    if (!notes) {
      return res.status(404).json({
        error: "Notes not found",
      });
    }
    return res.json({
      content: notes.content,
      topic: notes.topic,
      createdAt: notes.createdAt,
    });
  } catch (error) {
    return res.status(500).json({ message: `getSingle notes error  ${error}` });
  }
};
