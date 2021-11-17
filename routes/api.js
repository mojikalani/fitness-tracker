const router = require("express").Router();
const db = require("../models/workout");

// GET Request for getting all workouts
router.get("/api/workouts", (req, res) => {
	db.aggregate([
	  {
		$addFields: {
		  totalDuration: { $sum: "$exercises.duration" },
		  totalSets: { $sum: "$exercises.sets"}
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

// GET request for range
router.get("/api/workouts/range", (req, res) => {
	db.aggregate([
	  {
		$addFields: {
		  totalDuration: { $sum: "$exercises.duration" },
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
		.then((newWorkout) => {
			res.json(newWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

// PUT/Update workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
	db.findByIdAndUpdate(params.id, { $push: { exercises: body } })
		.then((updateWorkout) => {
			res.json(updateWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});


module.exports = router;