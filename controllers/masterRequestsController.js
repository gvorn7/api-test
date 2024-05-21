const { connectDb, closeDb } = require("../config/db.config");
var Type = require("mssql").TYPES;
const create_MasterRequest = async (req, res) => {
  try {
    const partNo = req.body.partNo;
    const mcType = req.body.mcType;
    const mcNo = req.body.mcNo;
    const revPart = req.body.revPart;
    const dateOfReq = req.body.dateOfReq;

    const pool = await poolPromise;

    const result = await pool.request();

    result
      .input("partNo", Type.NVarChar, partNo)
      .input("mcType", Type.NVarChar, mcType)
      .input("mcNo", Type.NVarChar, mcNo)
      .input("revPart", Type.NVarChar, revPart)
      .input("dateOfReq", Type.Date, dateOfReq);

    result.query(
      "INSERT INTO YourTableName (PartNo, MCNo, RevPart, DateOfReq) VALUES (@partNo, @mcNo, @revPart, @dateOfReq)",
      function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).json({
            success: false,
            message: "Error inserting record",
            error: err.message
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Record inserted successfully"
          });
        }
      }
    );
  } catch (err) {
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
