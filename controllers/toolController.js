const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;

const get_tool = async function (req, res) {
  try {
    console.log("Request Body:", req.body);

    const pool = await poolPromise;
    console.log("Database pool created:", pool);

    const result = await pool
      .request()
      .query("EXEC [trans].[tb_Master_Tooling_Query]");

    console.log("Query Result:", result);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const get_toolByEmp_Code = async function (req, res) {
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

const getMasterToolingData = async (req, res) => {
  try {
    const { partNo, process, mc } = req.query;

    const pool = await poolPromise;
    const result = await pool.request()
      .input('PartNo', Type.NVarChar, partNo)
      .input('Process', Type.NVarChar, process)
      .input('MC',Type.NVarChar, mc)
      .query('EXEC [trans].[tb_Master_Tooling_Query] WHERE PartNo = @PartNo AND Process = @Process AND MC = @MC');

    res.json(result.recordset); // Send the result back to the client
  } catch (err) {
    console.error('Error executing query:', err.stack);
    res.status(500).send({ error: 'Internal Server Error', details: err.message });
  }
};


module.exports = {
  get_tool,
  get_toolByEmp_Code,
  getMasterToolingData,
};
