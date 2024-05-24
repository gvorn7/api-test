const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;

const create_MasterRequest = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const {
      division,
      PartNo,
      selectedProcess,
      mcType,
      mcNo,
      revPart,
      selectedCase,
      dateOfReq,
    } = req.body;

    const pool = await poolPromise;

    const query = `
      INSERT INTO YourTableName (Division, PartNo, Process, MCType, MCNo, RevPart, Case, DateOfReq)
      VALUES (@division, @PartNo, @selectedProcess, @mcType, @mcNo, @revPart, @selectedCase, @dateOfReq)
    `;

    // Execute query
    const result = await pool
      .request()
      .input("division", sql.NVarChar, division)
      .input("PartNo", sql.NVarChar, PartNo)
      .input("selectedProcess", sql.NVarChar, selectedProcess)
      .input("mcType", sql.NVarChar, mcType)
      .input("mcNo", sql.NVarChar, mcNo)
      .input("revPart", sql.NVarChar, revPart)
      .input("selectedCase", sql.NVarChar, selectedCase)
      .input("dateOfReq", sql.Date, dateOfReq)
      .query(query);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Record inserted successfully",
    });
  } catch (err) {
    // Handle errors
    console.error("Error executing query:", err.stack);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

const Post_PartNo = async function (req, res) {
  try {
    console.log("Request Body:", req.body);

    const pool = await poolPromise;
    console.log("Database pool created:", pool);

    const result = await pool
      .request()
      .query("EXEC [trans].[tb_Master_Tooling_Query_PartxALL]");

    // console.log("Query Result:", result);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const Post_Process = async function (req, res) {
  try {
    console.log("Request Params:", req.body);

    const { PartNo } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("PartNo", Type.NVarChar, PartNo)
      .query("EXEC [trans].[tb_Master_Tooling_Query_Partx1] @PartNo");

    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Part Number not found" });
    } else {
      res.json(result.recordsets);
    }
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res.status(500).json({ error: " Server Error", details: error.message });
  }
};


const Post_MC = async function (req, res) {

  try {
    const { PartNo ,Process} = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("PartNo", Type.NVarChar, PartNo)
      .input("Process", Type.NVarChar, Process)
      .query("EXEC [trans].[tb_Master_Tooling_Query_Partx2] @PartNo, @Process");

    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Part Number not found" });
    } else {
      res.json(result.recordsets);
    }
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res.status(500).json({ error: " Server Error", details: error.message });
  }
};

const Post_ToolDetial = async function (req, res) {
  try {
    console.log("Request Params:", req.body);

    const { PartNo, Process, MC } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("PartNo", Type.NVarChar, PartNo)
      .input("Process", Type.NVarChar, Process)
      .input("MC", Type.NVarChar, MC)
      .query(
        "EXEC [trans].[tb_Master_Tooling_Query_Partx3] @PartNo, @Process, @MC"
      );

    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Part Number not found" });
    } else {
      res.json(result.recordsets);
    }
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res.status(500).json({ error: " Server Error", details: error.message });
  }
};

module.exports = {
  create_MasterRequest,
  Post_PartNo,
  Post_Process,
  Post_MC,
  Post_ToolDetial,
};
