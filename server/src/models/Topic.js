// Topic.js
import mongoose from 'mongoose';

const Topic = mongoose.model('Topic', {
    label: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    creationDate: Date,
    creationUser: {
        type: String,
        required: true,
        trim: true,
    },
});

const TopicModel = {
    /**
     * @brief Insert a new topic into db
     * @param {JSON} topic 
     */
    insert: async (topic) => {
        const newTopic = new Topic({
            label: topic.label,
            description: topic.description,
            creationDate: topic.creationDate,
            creationUser: topic.creationUser,
        });

        await newTopic.save();
    },

    save: async (topic) => {
        // const newTopic = new Topic({
        //     label: topic.label,
        //     image: topic.image,
        //     creationDate: topic.creationDate,
        //     creationUser: topic.creationUser,
        // });

        await topic.save();
    },

    update: async (topic) => {
        const topic2 = await Topic.findOne(label);

        const newTopic = new Topic({
            label: topic.label,
            description: topic.description,
            creationDate: topic.creationDate,
            creationUser: topic.creationUser,
        });

        await newTopic.updateOne(newTopic);
    },

    /**
     * @brief get topic by label
     * @param {string} label 
     * @returns {string || null} depending on whether the topic is found or not
     */
    findOne: async (label) => {
        return await Topic.findOne(label);
    },

    getAllTopicsWithLimit: async (limit) => {
        return await Topic.find().limit(parseInt(limit));
    },

    delete: async (label) => {
        await Topic.deleteOne(label);
    },
};

export default TopicModel;