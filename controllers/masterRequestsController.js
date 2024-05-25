const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;




const  create_reqTool  = async (req, res) => {
  try {
    const { Emp_Code,Doc_No, Req_Case, Req_Date_Request, Part_No, Process, Tooling_Name, Tooling_Type, Tooling_Spec, Item_No, Division, MC, MC_No, Dwg_Rev, CT, Usage_Pcs } = req.body;
    const pool = await poolPromise;
    const result = await pool.request();

    result
    .input('Emp_Code', Type.NVarChar, Emp_Code)
    .input('Doc_No', Type.NVarChar, Doc_No)
    .input('Req_Case', Type.NVarChar, Req_Case)
    .input('Req_Date_Request', Type.NVarChar, Req_Date_Request)
    .input('Part_No', Type.NVarChar, Part_No)
    .input('Process', Type.NVarChar, Process)
    .input('Tooling_Name', Type.NVarChar, Tooling_Name)
    .input('Tooling_Type', Type.NVarChar, Tooling_Type)
    .input('Tooling_Spec', Type.NVarChar, Tooling_Spec)
    .input('Item_No', Type.NVarChar, Item_No)
    .input('Division', Type.NVarChar, Division)
    .input('MC', Type.NVarChar, MC)
    .input('MC_No', Type.NVarChar, MC_No)
    .input('Dwg_Rev', Type.NVarChar, Dwg_Rev)
    .input('CT', Type.NVarChar, CT)
    .input('Usage_Pcs', Type.NVarChar, Usage_Pcs);
      
    result.query(
      'EXEC [trans].[tb_Request_Insert] @Emp_Code,@Doc_No,@Req_Case,@Req_Date_Request,@Part_No,@Process,@Tooling_Name,@Tooling_Type,@Tooling_Spec,@Item_No,@Division,@MC,MC_No,@Dwg_Rev,@CT,@Usage_Pcs',
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json({
            success: true,
            message: "Employee added successfully",
            result: result,
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
    const { PartNo, Process } = req.body;

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
  create_reqTool,
  Post_PartNo,
  Post_Process,
  Post_MC,
  Post_ToolDetial,
};
