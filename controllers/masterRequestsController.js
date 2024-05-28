const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;

  // Emp_Code,
  //       Doc_No,
  //       _Division,
  //       case_,
  //       dateOfReq,
  //       OPIST_Process,
  //       ITEM_NO,
  //       OPIST_PartNo,
  //       SPEC,
  //       OPIST_Usage_pcs,
  //       Revision,
  //       OPIST_MC,
  //       MCNo,
  //       Qty,
  //       Result1,
  //       Result2,
  //       Result3,
  //       Result4,
  //       Result5,
  //       Result6


// Route to insert selected rows
const insertSelectedRows = async (req, res) => {
  try {
    const {
      Emp_Code,
      Doc_No,
      _Division,
      Case_,
      dateOfReq,
      OPIST_Process,
      ITEM_NO,
      OPIST_PartNo,
      SPEC,
      OPIST_Usage_pcs,
      Revision,
      OPIST_MC,
      MCNo,
      Qty,
      Result1,
      Result2,
      Result3,
      Result4,
      Result5,
      Result6,
    } = req.body;

    const pool = await poolPromise;
    const request = pool.request();
    
    request.input('Emp_Code', Type.NVarChar, Emp_Code)
           .input('Doc_No', Type.NVarChar, Doc_No)
           .input('_Division', Type.NVarChar, _Division)
           .input('Case_', Type.NVarChar, Case_)
           .input('dateOfReq', Type.Date, dateOfReq)
           .input('OPIST_Process', Type.NVarChar, OPIST_Process)
           .input('ITEM_NO', Type.NVarChar, ITEM_NO)
           .input('OPIST_PartNo', Type.NVarChar, OPIST_PartNo)
           .input('SPEC', Type.NVarChar, SPEC)
           .input('OPIST_Usage_pcs', Type.Int, OPIST_Usage_pcs)
           .input('Revision', Type.NVarChar, Revision)
           .input('OPIST_MC', Type.NVarChar, OPIST_MC)
           .input('MCNo', Type.NVarChar, MCNo)
           .input('Qty', Type.Int, Qty)
           .input('Result1', Type.Int, Result1)
           .input('Result2', Type.Int, Result2)
           .input('Result3', Type.Int, Result3)
           .input('Result4', Type.Int, Result4)
           .input('Result5', Type.Int, Result5)
           .input('Result6', Type.Int, Result6);

    await request.query(`
      EXEC [trans].[stored_tb_Request_Insert] 
      @Emp_Code, @Doc_No, @_Division, @Case_, @dateOfReq, @OPIST_Process, 
      @ITEM_NO, @OPIST_PartNo, @SPEC, @OPIST_Usage_pcs, @Revision, @OPIST_MC, 
      @MCNo, @Qty, @Result1, @Result2, @Result3, @Result4, @Result5, @Result6
    `);

    res.status(200).send('Rows inserted successfully');
  } catch (err) {
    console.error('Error inserting rows:', err);
    res.status(500).send('Error inserting rows');
  }
};


// const insertSelectedRows = async (req, res) => {
//   try {
//     const {
//       Part_No,
//       Item_No,
//       OPIST_MC,
//       OPIST_Process,
//       Spec,
//       Usage_Pcs,
//       OPIST_MC_No,
//       Qty,
//       Result1,
//       Result2,
//       Result3,
//       Result4,
//       Result5,
//       Result6,
//       _Division,
//       Dwg_Rev,
//       Req_Case,
//       Req_Date_Request,
//       CT,
//     } = req.body;

//     const pool = await poolPromise;
//     const result = await pool
//       .request()

//       .input("Part_No", Type.NVarChar, Part_No)
//       .input("Item_No", Type.NVarChar, Item_No)
//       .input("OPIST_MC", Type.NVarChar, OPIST_MC)
//       .input("OPIST_Process", Type.NVarChar, OPIST_Process)
//       .input("Spec", Type.NVarChar, Spec)
//       .input("Usage_Pcs", Type.NVarChar, Usage_Pcs)
//       .input("OPIST_MCNo", Type.NVarChar, OPIST_MCNo)
//       .input("Qty", Type.NVarChar, Qty)
//       .input("Result1", Type.NVarChar, Result1)
//       .input("Result2", Type.NVarChar, Result2)
//       .input("Result3", Type.NVarChar, Result3)
//       .input("Result4", Type.NVarChar, Result4)
//       .input("Result5", Type.NVarChar, Result5)
//       .input("Result6", Type.NVarChar, Result6)
//       .input("_Division", Type.NVarChar, _Division)
//       .input("DwgRev", Type.NVarChar, DwgRev)
//       .input("CT", Type.NVarChar, CT)
//       .input("ReqCase", Type.NVarChar, ReqCase)
//       .input("Req_Date_Request", Type.NVarChar, Req_Date_Request);

//     result.query(
//       "EXEC [trans].[tb_Request_Insert] @Part_No,@Item_No,@OPIST_MC,@OPIST_Process,@Spec,@Usage_Pcs,@OPIST_MC_No,@Qty,@Result1,@Result2,@Result3,@Result4,@Result5,@Result6,@_Division,@Dwg_Rev",
//       function (err, result) {
//         if (err) {
//           console.log(err);
//           res.status(500).json({ success: false, error: err.message });
//         } else {
//           res.json({
//             success: true,
//             message: "Employee added successfully",
//             result: result,
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




// .input('Part_No', Type.NVarChar, Part_No)
// .input('Item_No', Type.NVarChar, Item_No)
// .input('OPIST_MC', Type.NVarChar, OPIST_MC)
// .input('OPIST_Process', Type.NVarChar, OPIST_Process)
// .input('Spec', Type.NVarChar, Spec)
// .input('Usage_Pcs', Type.NVarChar, Usage_Pcs)
// .input('OPIST_MC_No', Type.NVarChar, OPIST_MC_No)
// .input('Qty', Type.NVarChar, Qty)
// .input('Result1', Type.NVarChar, Result1)
// .input('Result2', Type.NVarChar, Result2)
// .input('Result3', Type.NVarChar, Result3)
// .input('Result4', Type.NVarChar, Result4)
// .input('Result5', Type.NVarChar, Result5)
// .input('Result6', Type.NVarChar, Result6)
// .input('_Division', Type.NVarChar, _Division)
// .input('Dwg_Rev', Type.NVarChar, Dwg_Rev)
// .input('Req_Case', Type.NVarChar, Req_Case)
// .input('Req_Date_Request', Type.NVarChar, Req_Date_Request)
// .input('CT', Type.NVarChar, CT)

const Post_OPIST_PartNo = async function (req, res) {
  try {
    console.log("Request Body:", req.body);

    const pool = await poolPromise;
    console.log("Database pool created:", pool);

    const result = await pool
      .request()
      .query("EXEC [trans].[stored_Master_Tooling_Query_A]");

    console.log("Query Result:", result);
    res.json(result.recordset);
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

const Post_OPIST_Process = async function (req, res) {
  try {
    console.log("Request Params:", req.body);

    const { OPIST_PartNo } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("OPIST_PartNo", Type.NVarChar, OPIST_PartNo)
      .query("EXEC [trans].[stored_Master_Tooling_Query_B] @OPIST_PartNo");

    if (result.recordset.length === 0) {
      res.status(404).json({ error: "Part Number not found" });
    } else {
      res.json(result.recordsets);
      console.log(result.recordsets);
    }
  } catch (error) {
    console.error("Error executing query:", error.stack);
    res.status(500).json({ error: " Server Error", details: error.message });
  }
};

const Post_MC = async function (req, res) {
  try {
    const { OPIST_PartNo, OPIST_Process } = req.body;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("OPIST_PartNo", Type.NVarChar, OPIST_PartNo)
      .input("OPIST_Process", Type.NVarChar, OPIST_Process)
      .query("EXEC [trans].[stored_Master_Tooling_Query_C] @OPIST_PartNo, @OPIST_Process");

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

    const { OPIST_PartNo, OPIST_Process, OPIST_MC } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("OPIST_PartNo", Type.NVarChar, OPIST_PartNo)
      .input("OPIST_Process", Type.NVarChar, OPIST_Process)
      .input("OPIST_MC", Type.NVarChar, OPIST_MC)
      .query(
        "EXEC [trans].[stored_Master_Tooling_Query_D] @OPIST_PartNo, @OPIST_Process, @OPIST_MC"
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
  insertSelectedRows,
  Post_OPIST_PartNo,
  Post_OPIST_Process,
  Post_MC,
  Post_ToolDetial,
};
