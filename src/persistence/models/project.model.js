import mongoose from 'mongoose';

const projectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  createdAt: {
    type: String,
    required: false,
  },
  disease: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true,
  },
  patientsFilter: {
    searchFromInWeeks: {
      type: Number,
      required: true,
    },
    diagnosis: [
      {
        type: String,
        required: true,
      },
    ],
  },
  collaborators: [
    {
      user: {
        type: String, //mail
        ref: 'Users',
        required: true,
      },
    },
  ],
  collaboratorsTodayActive: {
    type: Boolean,
    required: true,
  },
  collaboratorsToday: [
    {
      user: {
        type: String, //mail
        ref: 'Users',
        required: true,
      },
    },
  ],
  calls: {
    frequencyInDays: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
});

export const projectModel = mongoose.model('Projects', projectsSchema);
