const { connectDb, closeDb } = require("../config/db.config");
// const create_MasterRequest = async (req, res) => {}
const create_MasterRequest = async (req, res) => {
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
