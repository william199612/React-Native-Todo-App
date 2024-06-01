const express = require('express');
const router = express.Router();

// GET todos by user_id
router.get('/user/:user_id', async (req, res, next) => {
	const { user_id } = req.params;
	const knex = req.db;

	try {
		const todos = await knex('Todo').where({ user_id });
		return res.status(200).json({
			error: false,
			message: 'todos retrieved successfully',
			todos,
		});
	} catch (error) {
		return res.status(500).json({ error: true, error: error.message });
	}
});

// Post: create a new todo
router.post('/user/:user_id', async (req, res) => {
	const { user_id } = req.params;
	const { description, due_date } = req.body;
	const knex = req.db;

	if (!description || !due_date || !user_id) {
		return res.status(400).json({
			error: true,
			message: 'All fields are required',
		});
	}

	try {
		const [id] = await knex('Todo').insert({
			description,
			due_date,
			user_id,
		});
		if (!id) {
			return res.status(400).json({
				error: true,
				message: 'Cannot create todo',
			});
		}
		return res.status(201).json({ error: false, message: 'Todo created' });
	} catch (error) {
		return res.status(500).json({ error: true, error: error.message });
	}
});

// Get a specific todo by id
// for postman testing
router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const knex = req.db;

	try {
		const todo = await knex('Todo').where({ id }).first();
		if (!todo) {
			return res.status(404).json({ error: true, message: 'Todo not found' });
		}
		return res.status(200).json({
			error: false,
			message: 'todo by id retrieved successfully',
			todo,
		});
	} catch (error) {
		return res.status(500).json({ error: true, error: error.message });
	}
});

// Put: update an existing todo by id
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	const { description, due_date, completed } = req.body;
	const knex = req.db;

	try {
		let updateFields = {};
		if (description !== undefined) {
			updateFields.description = description;
		}
		if (due_date !== undefined) {
			updateFields.due_date = due_date;
		}
		if (completed !== undefined) {
			updateFields.completed = completed;
		}

		const updatedTodo = await knex('Todo').where({ id }).update(updateFields);
		if (updatedTodo === 0) {
			return res.status(404).json({
				error: true,
				message: 'Cannot update todo',
			});
		}
		return res.status(200).json({
			error: false,
			message: 'Update todo successfully',
		});
	} catch (error) {
		return res.status(500).json({ error: true, error: error.message });
	}
});

// Delete: delete an existing todo by id
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	const knex = req.db;

	try {
		const deleted = await knex('Todo').where({ id }).del();
		if (!deleted) {
			return res.status(404).json({
				error: true,
				message: 'Cannot delete todo',
			});
		}
		return res.status(200).json({
			error: false,
			message: 'Todo deleted successfully',
		});
	} catch (error) {
		return res.status(500).json({ error: true, error: error.message });
	}
});

module.exports = router;
