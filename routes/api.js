const router = require("express").Router();
const db = require("../models/exercise");

// GET Request for getting all workouts
router.get("/api/workouts", (req, res) => {
	db.aggregate([
	  {
		$addFields: {
		  totalDuration: { $sum: "$exercises.duration" },
		},
	  },
	])
	  .then((workouts) => {
		res.json(workouts);
	  })
	  .catch((err) => {
		res.status(400).json(err);
	  });
  });

// GET request
router.get("/api/workouts/range", (req, res) => {
	db.aggregate([
	  {
		$addFields: {
		  totalDuration: { $sum: "$exercises:duration" },
		},
	  },
	])
	  .then((stats) => {
		res.json(stats);
	  })
	  .catch((err) => {
		res.status(400).json(err);
	  });
  });

// POST workout
router.post("/api/workouts", (req, res) => {
	db.create({})
		.then((dbData) => {
			res.json(dbData);
		})
		.catch((err) => {
			res.json(err);
		});
});

// PUT/Update workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
	db.findByIdAndUpdate(params.id, { $push: { exercises: body } })
		.then((dbData) => {
			res.json(dbData);
		})
		.catch((err) => {
			res.json(err);
		});
});


module.exports = router;