const express=require('express')
const router=express.Router()
const Task=require('../Schema/task')

router.get('/tasks',async (req,res)=>
{
    try
    {
        const task=await Task.find()
        res.json(task)
    }
    catch(error)
    {
        res.status(500).json({message:error.message})
    }
})

router.post('/tasks',async(req,res)=>
{
    try
    {
        const task=new Task(req.body)
        await task.save()
        res.json({message:"Added Successfully .",task})
    }
    catch(err)
    {
        res.status(500).json({error:err.message})
    }

})

router.put('/tasks/:id', async (req, res) => 
{
    try 
    {
        const { id } = req.params;
        const Updated = req.body;
        const task = await Task.findByIdAndUpdate(id, Updated, { new: true });
        res.json({ message: "Updated Successfully", task });
    } 
    catch (err) 
    {
        res.status(400).json({ error: err.message });
    }
})
router.delete('/tasks/:id', async (req, res) => 
{
    try
    {
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: "Deleted Successfully" });
    }
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
})
module.exports=router