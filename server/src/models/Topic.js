// Topic.js
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Topic = mongoose.model('Topic', {
    label: String,
    image: String,
    creationDate: Date,
    creationUser: String,
});

const TopicModel = {
    /**
     * @brief Insert a new topic into db
     * @param {JSON} topic 
     */
    insert: async (topic) => {
        const newTopic = new Topic({
            label: topic.label,
            image: topic.image,
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
        console.log("topic = ", topic2);

        const newTopic = new Topic({
            label: topic.label,
            image: topic.image,
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
        console.log("Model label = ", label);
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