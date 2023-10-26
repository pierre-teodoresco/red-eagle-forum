// TopicController.js

import dotenv from 'dotenv';
dotenv.config();

import Topic from '../models/Topic.js';
import jwt from 'jsonwebtoken';
import Service from '../services/service.js';

const topicController = {
    /**
     * @brief create a new topic
     */
    create: async (req, res) => {
        try {
            // Vérifiez si un sujet avec le même label existe déjà
            const newLabel = req.body.label
            const existingTopic = await Topic.findOne({label: newLabel});
    
            if (existingTopic) {
                return res.status(400).json({ error: 'Topic with this label already exists' });
            }
    
            // Si le sujet n'existe pas, créez-le
            const newTopic = {
                label: req.body.label,
                description: req.body.description,
                creationDate: new Date(),
                creationUser: req.body.creationUser,
            };

            console.log("newTopic = ", newTopic);
    
            // Utilisez le modèle pour créer un nouveau sujet
            await Topic.insert(newTopic);
    
            res.status(201).json({ message: 'Topic created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    findOne: async (req, res) => {
        try {
            const label = req.params.label;
            console.log("label = ", label);
            const topic = await Topic.findOne({ label: label });
            console.log("topic = ", topic);
            if (topic) {
                res.status(200).json({ message: 'Topic found successfully', topic });
            } else {
                res.status(404).json({ message: 'Topic not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    findAll: async (req, res) => {
        try {
            const limit = req.query.limit || 10; // Récupérez le paramètre 'limit' de la requête ou utilisez une valeur par défaut (dans cet exemple, 10).

            // Utilisez le modèle pour récupérer la liste de sujets avec la limite spécifiée
            const topics = await Topic.getAllTopicsWithLimit(limit);

            res.status(200).json({ message: topics.length + ' Topics found successfully', topics }); // Renvoie la liste de sujets au format JSON
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    delete: async (req, res) => {
        try {
            const label = req.params.label; // Obtenez la valeur du champ unique 'label' depuis les paramètres de l'URL

            // Vérifiez si le sujet existe en fonction de la valeur du champ 'label'
            const existingTopic = await Topic.findOne({label: label});

            if (!existingTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            // Supprimez le sujet en utilisant l'identifiant récupéré du sujet existant
            await Topic.delete(existingTopic);

            //res.status(204).send(); // Réponse avec un statut 204 No Content en cas de succès
            res.status(200).json({ message: 'Topic deleted successfully', existingTopic });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    update: async (req, res) => {
        try {
            const label = req.body.label; // Obtenez la valeur du champ unique 'label' depuis les paramètres de l'URL

            // Vérifiez si le sujet existe en fonction de la valeur du champ 'label'
            const existingTopic = await Topic.findOne({label: label});
            console.log("existingTopic = ", existingTopic);

            if (!existingTopic) {
                return res.status(404).json({ error: 'Topic not found' });
            }

            // Mettez à jour les champs du sujet avec les nouvelles données du corps de la requête
            existingTopic.label = req.body.label || existingTopic.label;
            existingTopic.description = req.body.description || existingTopic.description;

            // Enregistrez les modifications dans la base de données ou le système de stockage
            await Topic.save(existingTopic);

            res.status(200).json({ message: 'Topic updated successfully', existingTopic }); // Réponse avec les détails du sujet mis à jour
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

};

export default topicController;
