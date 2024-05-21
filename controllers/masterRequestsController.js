const { connectDb, closeDb } = require("../config/db.config");
var Type = require("mssql").TYPES;


const create_MasterRequest = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    
    const { division, partNo, selectedProcess, mcType, mcNo, revPart, selectedCase, dateOfReq } = req.body;


    const pool = await poolPromise;


    const query = `
      INSERT INTO YourTableName (Division, PartNo, Process, MCType, MCNo, RevPart, Case, DateOfReq)
      VALUES (@division, @partNo, @selectedProcess, @mcType, @mcNo, @revPart, @selectedCase, @dateOfReq)
    `;

    // Execute query
    const result = await pool.request()
      .input('division', sql.NVarChar, division)
      .input('partNo', sql.NVarChar, partNo)
      .input('selectedProcess', sql.NVarChar, selectedProcess)
      .input('mcType', sql.NVarChar, mcType)
      .input('mcNo', sql.NVarChar, mcNo)
      .input('revPart', sql.NVarChar, revPart)
      .input('selectedCase', sql.NVarChar, selectedCase)
      .input('dateOfReq', sql.Date, dateOfReq)
      .query(query);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Record inserted successfully"
    });
  } catch (err) {
    // Handle errors
    console.error("Error executing query:", err.stack);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
};






// const create_MasterRequest = async (req, res) => {
//   try {
//     const Emp_Code = req.body.Emp_Code;
//     const pool = await poolPromise;


//     const result = await pool.request();

//     result
//       .input("a", Type.NVarChar, Emp_Code)
//       .input("b", Type.NVarChar, req.body.Emp_Name)
//       .input("c", Type.NVarChar, req.body.Emp_Surname)
//       .input("d", Type.NVarChar, req.body.empImg)
//       .input("e", Type.Int, req.body.Level_ID);
//     result.query(
//       "EXEC [trans].[tb_Employee_create] @a, @b,@c,@d,@e",
//       function (err, result) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.json({
//             success: true,
//             message: "Employee added successfully",
//             // data: result.recordset // If you want to send back the result set
//           });
//         }
//       }
//     );
//   } catch (err) {
//     console.error("Error executing query:", err.stack);
//     res
//       .status(500)
//       .send({ error: "Internal Server Error", details: err.message });
//   }
// };
const get_MasterRequests = async (req, res) => {};

const get_MasterRequestById = async (req, res) => {};



const update_MasterRequest = async (req, res) => {};

const delete_MasterRequest = async (req, res) => {};

module.exports = {
  get_MasterRequests,
  get_MasterRequestById,
  create_MasterRequest,
  update_MasterRequest,
  delete_MasterRequest,
};
