import { Router } from "express";
import { CalorieDatapoint } from "../entities/CalorieDatapoint";
import { User } from "../entities/User";
import { RequestError } from "../express";

const router = Router();

router.get("/", async (_req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1, { relations: ["calorieDatapoints"] });

        res.send(user?.calorieDatapoints);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1, { relations: ["calorieDatapoints"] });

        if (!user) throw new RequestError("Chould not load default user", {}, 500);

        if (!req.body.title || req.body.title.length <= 1 || req.body.title.length >= 32) throw new RequestError("Please provide a title, this should be between 1 and 32 characters", {}, 400);
        if (!req.body.calories) throw new RequestError("Please provide a valid calories amound", {}, 400);

        const datapoint = (await new CalorieDatapoint(req.body.title, req.body.calories, user).save());
        res.json(datapoint);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1, { relations: ["calorieDatapoints"] });

        if (!user) throw new RequestError("Chould not load default user", {}, 500);

        const datapoint = await CalorieDatapoint.findOne(req.params.id);

        if (!datapoint) throw new RequestError("Could not find that datapoint", {}, 404);
        if (req.body.title) datapoint.title = req.body.title;
        if (req.body.calories) datapoint.calories = req.body.calories;

        const returndata = await datapoint.save();
        res.json(returndata);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1, { relations: ["calorieDatapoints"] });

        if (!user) throw new RequestError("Chould not load default user", {}, 500);

        const datapoint = await CalorieDatapoint.findOne(req.params.id);

        if (!datapoint) throw new RequestError("Could not find that datapoint", {}, 404);

        const returnData = await datapoint.remove();
        res.json(returnData);
    } catch (error) {
        next(error);
    }
});

export default router;
