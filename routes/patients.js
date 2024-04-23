// routes/patients.js
const express = require('express');
const patientRouter = express.Router();
const Patient = require('../models/patient');

// Create a new patient
patientRouter.post('/', async (req, res) => {
    try {
        const { name, age } = req.body;
        const patient = await Patient.create({ name, age });
        res.status(201).json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all patients
patientRouter.get('/', async (req, res) => {
    try {
        const patients = await Patient.findAll();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific patient by ID
patientRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a patient by ID
patientRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [updated] = await Patient.update(req.body, {
            where: { id }
        });
        if (updated) {
            const updatedPatient = await Patient.findByPk(id);
            return res.json(updatedPatient);
        }
        throw new Error('Patient not found');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a patient by ID
patientRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Patient.destroy({
            where: { id }
        });
        if (deleted) {
            return res.json({ message: 'Patient deleted' });
        }
        throw new Error('Patient not found');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = patientRouter;
