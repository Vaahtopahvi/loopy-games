import mongoose, { Schema, Document } from "mongoose";
import { type Game as GameType } from "../../types/Game.js";

export interface IGame extends Omit<GameType, "id">, Document {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// game schema for mongodb
const GameSchema = new Schema<IGame>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    platform: {
      type: String,
      required: true,
      trim: true,
    },
    completionDate: {
      type: String,
      required: true,
    },
    playtimeHours: {
      type: Number,
      required: true,
      min: 0,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    interestingFact: {
      type: String,
      required: true,
      trim: true,
    },
    coverImage: {
      type: String,
      trim: true,
    },
    gameType: {
      type: String,
      required: true,
      enum: ["story", "endless"],
    },
    recommended: {
      type: Boolean,
      required: true,
      default: false,
    },
    isOngoing: {
      type: Boolean,
      default: false,
    },
    completionist: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
  }
);

// create a compound index for better query performance
GameSchema.index({ title: 1, platform: 1 }, { unique: true });

// transform function to convert _id to id when converting to JSON
GameSchema.methods.toJSON = function () {
  const gameObject = this.toObject();
  gameObject.id = gameObject._id.toString();
  delete gameObject._id;
  delete gameObject.__v;
  return gameObject;
};

export const Game = mongoose.model<IGame>("Game", GameSchema);
