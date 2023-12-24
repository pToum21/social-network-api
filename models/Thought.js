const { Schema, model, Types } = require('mongoose');

// schema for reaction which is an array of objects inside of the thoughts model
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        // set getters true
        toJSON: {
            getters: true,
        },
        id: false
    }
);

// the thought schema is the model for the thought itself
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (value) {
                return value.toLocaleString();
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]

    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length
    })

const Thought = model('thought', thoughtSchema)

module.exports = Thought;

