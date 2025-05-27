import { db } from "../libs/db.js";

export const createPlayList = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user.id;

    const playList = await db.playlist.create({
      data: {
        name,
        description,
        userId,
      },
    });

    res.status(201).json({
      message: "Playlist created successfully",
      success: true,
      playList,
    });
  } catch (error) {
    console.log("Error creating playlist", error);
    res.status(500).json({
      message: "Failed to create playlist",
    });
  }
};

export const getAllPlayListDetails = async (req, res) => {
  try {
    const playLists = await db.playlist.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Playlist fetched successfully",
      success: true,
      playLists,
    });
  } catch (error) {
    console.log("Error fetching playlist", error);
    res.status(500).json({
      message: "Failed to fetch playlist",
    });
  }
};

export const getPlayListDetails = async (req, res) => {
  const { playlistId } = req.params;
  try {
    const playList = await db.playlist.findUnique({
      where: { id: playlistId, userId: req.user.id },
      include: {
        problems: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playList) {
      return res.status(404).json({
        message: "Playlist not found",
      });
    }

    res.status(200).json({
      message: "Playlist fetched successfully",
      success: true,
      playList,
    });
  } catch (error) {
    console.log("Error fetching playlist", error);
    res.status(500).json({
      message: "Failed to fetch playlist",
    });
  }
};

export const addProblemToPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;

  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      res.status(400).json({
        message: "Invalid or missing problemIds",
      });
    }

    // Create records for each problem in the playlist

    const problemsInPlaylist = await db.problemInPlaylist.createMany({
      data: problemIds.map((problemId) => ({
        playListId: playlistId,
        problemId,
      })),
    });

    res.status(201).json({
      message: "Problems added to playlist successfully",
      success: true,
      problemsInPlaylist,
    });
  } catch (error) {
    console.log("Error adding problems to playlist", error.message);
    res.status(500).json({
      message: "Failed to add problems to playlist",
    });
  }
};

export const deletePlayList = async (req, res) => {
  const { playlistId } = req.params;

  try {
    const deletedPlaylist = await db.playlist.delete({
      where: {
        id: playlistId,
      },
    });

    res.status(200).json({
      message: "Playlist deleted successfully",
      success: true,
      deletedPlaylist,
    });
  } catch (error) {
    console.log("Error deleting playlist", error.message);
    res.status(500).json({
      message: "Failed to delete playlist",
    });
  }
};

export const removeProblemFromPlaylist = async (req, res) => {
  const { playlistId } = req.params;
  const { problemIds } = req.body;
  try {
    if (!Array.isArray(problemIds) || problemIds.length === 0) {
      return res.status(400).json({ error: "Invalid or missing problemIds" });
    }

    // Only delete given problemIds not all

    const deletedProblem = await db.problemInPlaylist.deleteMany({
      where: {
        playlistId,
        problemId: {
          in: problemIds,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Problem removed from playlist successfully",
      deletedProblem,
    });
  } catch (error) {
    console.log("Error removing problem from playlist", error.message);
    res.status(500).json({
      message: "Failed to remove problem from playlist",
    });
  }
};
