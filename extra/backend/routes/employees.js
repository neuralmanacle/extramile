const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.post('/', async (req, res) => {
    const { name, email, position, department } = req.body;
    try {
        let employee = new Employee({ name, email, position, department });
        await employee.save();
        res.json(employee);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.put('/:id', async (req, res) => {
    const { name, email, position, department } = req.body;
    try {
        let employee = await Employee.findById(req.params.id);
        employee.name = name;
        employee.email = email;
        employee.position = position;
        employee.department = department;
        await employee.save();
        res.json(employee);
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Employee removed' });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;