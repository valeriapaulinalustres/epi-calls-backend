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
    type: String, //mail
    ref: 'Users',
    required: false,
  },
  collaborator: {
    type: String,
  },
  project: {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Projects',
    required: true,
  }
});

export const sheetModel = mongoose.model('Sheets', sheetsSchema);
