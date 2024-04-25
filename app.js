const express= require('express');
const app=express();
const dotenv=require('dotenv')
const dbEmp= require("./employee")

dotenv.config()
const PORT=5000
app.use(express.json());

app.post('/add',dbEmp.createEmployee)
app.get('/retrieve',dbEmp.getEmployees)
app.get('/:id',dbEmp.getEmployeeById)
app.patch('/:id',dbEmp.updateEmployee)
app.delete('/:id',dbEmp.deleteEmployee)






// app.get("/",(req,res)=>{
//     res.send("hello from express");
    
// })

app.listen(PORT,()=>
    console.log(`server is running on ${PORT}`))

