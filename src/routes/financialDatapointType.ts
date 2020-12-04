import { Router } from "express";
import { FinancialDatapointType } from "../entities/FinancialDatapointType";
import { User } from "../entities/User";
import { RequestError } from "../express";

const router = Router();

router.get("/", async (_req, res, next) => {
    try {
        const datapoints = await FinancialDatapointType.find();
        res.send(datapoints);
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

        const datapointType = (await new FinancialDatapointType(req.body.title).save());
        res.json(datapointType);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        // Use default user
        const user = await User.findOne(1);

        if (!user) throw new RequestError("Chould not load default user", {}, 500);

        const datapointType = await FinancialDatapointType.findOne({
            where: { title: req.body.title }
        });

        if (!datapointType) throw new RequestError("Could not find that datapointType", {}, 404);

        if (req.body.title) datapointType.title = req.body.title;

        const returndata = await datapointType.save();
        res.json(returndata);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const datapointType = await FinancialDatapointType.findOne(req.params.id);

        if (!datapointType) throw new RequestError("Could not find that datapointType", {}, 404);

        const returnData = await datapointType.remove();
        res.json(returnData);
    } catch (error) {
        next(error);
    }
});

export default router;
