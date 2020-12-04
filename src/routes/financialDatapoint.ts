import { Router } from "express";
import { FinancialDatapoint } from "../entities/FinancialDatapoint";
import { FinancialDatapointType } from "../entities/FinancialDatapointType";
import { User } from "../entities/User";
import { RequestError } from "../express";

const router = Router();

router.get("/", async (_req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1, { relations: ["financialDatapoints"] });

        res.send(user?.financialDatapoints);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1);

        if (!user) throw new RequestError("Chould not load default user", {}, 500);
        
        if (!req.body.title || req.body.title.length <= 1 || req.body.title.length >= 32) throw new RequestError("Please provide a title, this should be between 1 and 32 characters", {}, 400);
        if (!req.body.price) throw new RequestError("Please provide a valid price", {}, 400);
        if (!req.body.type) throw new RequestError("Please provide a valid type", {}, 400);

        const dataPointType = await FinancialDatapointType.findOne({
            where: {title: req.body.type}
        });

        if (!dataPointType) throw new RequestError("No type found with that typeTitle", {}, 404);

        const datapoint = (await new FinancialDatapoint(req.body.title, req.body.price, dataPointType, user).save());
        res.json(datapoint);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1);

        if (!user) throw new RequestError("Chould not load default user", {}, 500);

        let dataPointType;

        if (req.body.type) {
            dataPointType = await FinancialDatapointType.findOne({
                where: {title: req.body.type}
            });
            if (!dataPointType) throw new RequestError("No type found with that typeTitle", {}, 404);
        }

        const datapoint = await FinancialDatapoint.findOne({
            where: { id: req.params.id }
        });

        if (!datapoint) throw new RequestError("Could not find that datapoint", {}, 404);

        if (dataPointType) datapoint.type = dataPointType;
        if (req.body.title) datapoint.title = req.body.title;
        if (req.body.price) datapoint.price = req.body.price;

        const returndata = await datapoint.save();
        res.json(returndata);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const datapoint = await FinancialDatapoint.findOne(req.params.id);

        if (!datapoint) throw new RequestError("Could not find that datapoint", {}, 404);

        const returnData = await datapoint.remove();
        res.json(returnData);
    } catch (error) {
        next(error);
    }
});

export default router;
