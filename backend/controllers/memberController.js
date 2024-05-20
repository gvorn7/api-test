const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;


const get_mem = async function (req, res) {
  try {
    console.log("Request Body:", req.body);

    const pool = await poolPromise;
    console.log("Database pool created:", pool);

    const result = await pool
      .request()
      .query("EXEC [trans].[tb_Emp_Query]");

    // console.log("Query Result:", result);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const get_memByEmp_Code = async function (req, res) {
  try {
    console.log("Request Params:", req.params);

    const { Emp_Code } = req.params;

    const pool = await poolPromise;
    console.log("Database pool created:", pool);

    const result = await pool
      .request()
      .input("Emp_Code", Emp_Code)
      .query("EXEC [trans].[tb_Emp_QueryByCode] @Emp_Code");

    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Employee not found" });
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const update_MemberByCode = async (req, res) => {
  try {
    const Emp_Code = req.body.Emp_Code;
    const pool = await poolPromise;

    // Assuming empImg is in binary format, handle img format
    // const empImg = req.body.Emp_Img ? Buffer.from(req.body.Emp_Img, 'base64') : null;
    // console.log(req.body)
    const result = await pool.request();

    result
      .input("a", Type.NVarChar, Emp_Code)
      .input("b", Type.NVarChar, req.body.Emp_Name)
      .input("c", Type.NVarChar, req.body.Emp_Surname)
      .input("d", Type.NVarChar, req.body.empImg)
      .input("e", Type.Int, req.body.Level_ID);
    result.query(
      "EXEC [trans].[tb_EmpByCode_Update] @a, @b,@c,@d,@e",
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            message: "Employee updated successfully",
            // data: result.recordset // If you want to send back the result set
          });
        }
      }
    );
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};
const create_NewEmployee = async (req, res) => {
  try {
    const Emp_Code = req.body.Emp_Code;
    const pool = await poolPromise;
    const result = await pool.request();

    result
      .input("a", Type.NVarChar, Emp_Code)
      .input("b", Type.NVarChar, req.body.Emp_Name)
      .input("c", Type.NVarChar, req.body.Emp_Surname)
      .input("d", Type.NVarChar, req.body.empImg)
      .input("e", Type.Int, req.body.Level_ID);
      
    result.query(
      "EXEC [trans].[tb_Employee_create] @a, @b,@c,@d,@e",
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            message: "Employee added successfully",
            // data: result.recordset // If you want to send back the result set
          });
        }
      }
    );
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};

const delete_Employee = async (req, res) => {
  try {
    const Emp_Code = req.body.Emp_Code;

    if (!Emp_Code) {
      return res.status(400).send({ error: "Emp_Code is required" });
    }

    const pool = await poolPromise;
    const result = await pool.request();
    result
      .input("Emp_Code", Type.NVarChar, Emp_Code)
      .execute("[trans].[tb_Employee_Delete]",
        function (err) {
          if (err) {
            console.log(err);
          } else {
            res.json({
              success: true,
              message: "Employee Deleted successfully",
            });
          }
        }
      );
  } catch (err) {
    console.error("Error executing query:", err.stack);
    res
      .status(500)
      .send({ error: "Internal Server Error", details: err.message });
  }
};

module.exports = {
  get_mem,
  get_memByEmp_Code,
  update_MemberByCode,
  create_NewEmployee,
  delete_Employee,
};

// const update_MemberByCode = async (req, res) => {
//   try {
//     const { Emp_Code } = req.params;
//     const { Emp_Name, Emp_Surname, Emp_Img, Level_ID } = req.body;

//     db = await connectDb();
//     await db.request()
//       .input('EmpCode',.NVarChar, Emp_Code)
//       .input('Emp_Name',.NVarChar, Emp_Name)
//       .input('Emp_Surname',.NVarChar, Emp_Surname)
//       .input('Emp_Img',.NVarChar, Emp_Img)
//       .input('Level_ID',.Int, Level_ID)
//       .execute('[trans].[tb_EmpByCode_Update]');

//     res.json({ message: "Employee updated successfully" });
//   } catch (err) {
//     console.error("Error executing query:", err.stack);
//     res.status(500).send({ error: "Internal Server Error", details: err.message });
//   }
// };

// const { connectDb, closeDb } = require("../config/db.config");

// const get_mem = async function (req, res) {
//   try {
//     console.log(req.body)
//     const pool = await poolPromise;
//     const result = await pool
//       .query("SELECT * FROM [db_Gauge_Inventory].[master].[tb_Employee]");

//     res.json(result.recordset);  // Send all records
//     console.log(result.recordset);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//   get_mem,
// };
