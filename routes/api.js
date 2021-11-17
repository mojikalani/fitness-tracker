const router = require("express").Router();
const Workout = require("../models/workout.js");

// GET Request for getting all workouts
router.get("/api/workouts", (req, res) => {
	Workout.aggregate([
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
	Workout.aggregate([
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
	Workout.create({})
		.then((newWorkout) => {
			res.json(newWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});

// PUT/Update workout
router.put("/api/workouts/:id", (req, res) => {
    Workout.findByIdAndUpdate(
        req.params.id,
        { $push: { exercises: req.body } },
        { new: true}
    )
        .then((workout) => {
            res.json(workout)
        })
        .catch((e) => {
            res.json(e)
        })
});


module.exports = router;