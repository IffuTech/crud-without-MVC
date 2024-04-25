const Pool=require('pg').Pool

const pool=new Pool({
    user:'postgres',
    host:'localhost',
    database:"my_pgdb",
    password:'123456',
    port:5432
})
//CRUD WITHOUT MVC PATTERN

// insert data into employees
  const createEmployee=(req,res)=>{
     const{name,email}=req.body
      pool.query(`INSERT INTO employees(name,email)VALUES($1,$2)RETURNING * `,[name,email],(err,result)=>{
        if(err){
            console.log(err);
            throw err
        }
        res.status(200).json({
            msg:"data created successfully",
            data:result.rows[0],
        });
      })
  };
  //get all employees

  const getEmployees=(req,res)=>{
    pool.query(`SELECT * FROM employees`,(err,result)=>{
        if(err){
            throw err
        }
        res.json({
            data:result.rows
        })
    })
  };
  //get employees by id
  const getEmployeeById=(req,res)=>{
    let id=parseInt(req.params.id)
    pool.query(`SELECT * FROM employees WHERE id=$1`,[id],(err,result)=>{
        if(err){
            throw err
        }
        res.json({
            data: result.rows
        })
    })
  };
  //update employee
  const updateEmployee=(req,res)=>{
    let id= parseInt(req.params.id)
    const{name,email}=req.body;
    pool.query(`UPDATE employees SET name=$1,email=$2 WHERE id=$3`,[name,email,id],(err,result)=>{
        if(err){
            throw err
        }
        res.json({
            msg:"updated successfully",
            data:result.rows
        })
    })
  };
  //delete employee
  const deleteEmployee=(req,res)=>{
    const id=parseInt(req.params.id)
    pool.query(`DELETE FROM employees WHERE id=$1`,[id],(err,result)=>{
        if(err){
            throw err
        }
        res.json({
            msg:`employee with ${id}  deleted successfully`
        })
    })
  }
  
  

  module.exports={
    createEmployee,getEmployees,getEmployeeById,updateEmployee,deleteEmployee
  }