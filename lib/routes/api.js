var router = require('express').Router()
var people = require('../../data/people.json')

// Simple "Hello, world!"
router.route('/hello')
.get(function(req, res) {
	res.send('Hello, world!')
})

// Search for people. Use URL query as search queries.
// Ex: http://localhost:5000/api/people?first_name=James should
// return people with first name that include the string "James"
router.route('/people')
.get(function(req, res) {
	var results = people.filter(function(person) {
		for (var key in req.query) {
			if (!person[key] || !person[key].includes(req.query[key])) {
				return false
			}
		}

		return true
	})

	res.render('pages/people', { results: results })
})

module.exports = router
