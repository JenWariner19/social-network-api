const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: { type: String, required: true, maxLength: 280 },
        username: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
          },
          id: false, 
    });

const thoughtSchema = new Schema(
  {
    thoughtText: { type: String, required: true, maxLength: 280 },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  });


thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

thoughtSchema.virtual('createdAtFormatted').get(function() {
    return formatDate(this.createdAt);
});

reactionSchema.virtual('createdAtFormatted').get(function() {
    return formatDate(this.createdAt);
});

function formatDate(date) {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;