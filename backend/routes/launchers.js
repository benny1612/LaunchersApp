import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const db = getDb();

    const launchers = await db.collection("launchers").find({}).toArray();

    res.json(launchers);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = req.params.id;

    const launcher = await db.collection("launchers").findOne({
      _id: new ObjectId(id),
    });

    if (!launcher) {
      return res.status(404).json({ msg: "launcher not found" });
    }

    res.json(launcher);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});

router.delete('/:id',async(req,res)=>{
    try{
        const db=getDb()
        const id = req.params.id
        const result =await db.collection("launchers").deleteOne({
      _id: new ObjectId(id),
    })
    if(result.deletedCount===0){
        res.status(404).json({msg:"launcher not found"})
    }
    res.status(200).json({msg:`launcher deleted count : ${result.deletedCount}`})
    }catch(error){
         res.status(500).json({ msg: "internal server error" });
    }
})


router.post("/", async (req, res) => {
  try {
    const db = getDb();
    const { name, rocketType, latitude, longitude, city } = req.body;

    if (!name || !rocketType || !latitude || !longitude || !city) {
      return res.status(400).json({ msg: "missing fields" });
    }

    if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
      return res
        .status(400)
        .json({ msg: "latitude and longitude must be numbers" });
    }

    const newLauncher = {
      name,
      rocketType,
      latitude: Number(latitude),
      longitude: Number(longitude),
      city,
    };

    const result = await db.collection("launchers").insertOne(newLauncher);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
});


router.put('/:id',async(req,res)=>{
    try{
        const db =getDb()
        const {id}=req.params
     const { name, rocketType, latitude, longitude, city } = req.body;
     const updateData ={}
     if (name) {updateData.name=name}
    if (rocketType) {updateData.rocketType=rocketType}
    if(latitude){updateData.latitude=latitude}
    if(longitude){updateData.longitude=longitude}
    if(city){updateData.city=city}
    if (Object.keys(updateData).length === 0) {
  return res.status(400).json({ msg: "Nothing was updated" });}
    const updateLauncher = await db.collection("launchers").updateOne(
  { _id: new ObjectId(id) },
  { $set: updateData }
);
res.status(200).json({msg:"filed update"})

    }catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
})

export default router;
