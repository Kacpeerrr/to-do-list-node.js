const Task = require('../db/models/task')

class TaskController {
	async showTasks(req, res) {
		// pobierz wszystkie taski i wyświetl na widoku
		const tasks = await Task.find({})
		res.render('pages/tasks/index', { tasks })
	}

	showCreateForm(req, res) {
		// wyświetl formularz nowego taska
		res.render('pages/tasks/create')
	}

	async create(req, res) {
		// przygotuj nowy task
		const task = new Task({
			title: req.body.title,
			description: req.body.description,
		})
		try {
			await task.save()
			res.redirect('/')
		} catch (e) {
			// jeśli są błędy, wyświetl ja na widoku
			res.render('pages/tasks/create', {
				errors: e.errors,
				form: req.body,
			})
		}
	}

	async showEditForm(req, res) {
		// pobierz task i wyświetl formularz edycji
		// mongoose posiada metodę .findById
		const task = await Task.findById(req.params.id)

		//Pod wartością przekazujemy formularz
		res.render('pages/tasks/edit', {
			form: task,
		})
	}

	async edit(req, res) {
		// pobierz task
		const task = await Task.findById(req.params.id)
		task.title = req.body.title
		task.description = req.body.description

		// zaktualizuj dane

		try {
			// zapisz i przekieruj na stronę główną
			await task.save()
			res.redirect('/')
		} catch (e) {
			// jeśli są błędy, wyświetl ja na widoku
			res.render('pages/tasks/edit', {
        errors: e.errors,
        form: req.body
      })
		}
	}

	async delete(req, res) {
		try {
			await Task.findByIdAndDelete(req.params.id)
			res.redirect('/')
		} catch (e) {
			// opcjonalnie obsłuż błąd
		}
	}

	async toggleDone(req, res) {
		// pobierz task
		const task = await Task.findById(req.params.id)
		// zmień wartość "done" taska (na odwrotną, czyli z 1 na 0, lub z 0 na 1)
		task.done = task.done ? 0 : 1
		await task.save()
		// oraz przekieruj na stronę główną
		res.redirect('/')
	}
}

module.exports = new TaskController()
