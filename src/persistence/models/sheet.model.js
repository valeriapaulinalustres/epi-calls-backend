import mongoose from 'mongoose';

const sheetsSchema = new mongoose.Schema({
  excel: {
    type: Array,
    required: true,
  },
  updatedAt: {
    type: String,
    required: false,
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: false,
  },
  collaborator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  project: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Projects',
    required: true,
  }
});

export const sheetModel = mongoose.model('Sheets', sheetsSchema);
