const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;


// Route to insert selected rows
const insertSelectedRows =  async (req, res) => {


  try {
    const { PartNo, ItemNo, MC, Process, Spec, Usage_pcs,CT, MCNo, Qty, Result1, Result2, Result3, Result4, Result5, Result6, Division, revPart, Case, dateOfReq } = req.body;
    const pool = await poolPromise;
    const result = await pool.request();
      result
      .input('Emp_Code', Type.NVarChar, Emp_Code)
      .input('Doc_No', Type.NVarChar, Doc_No)
      .input('PartNo', Type.NVarChar, PartNo)
.input('Process', Type.NVarChar, Process)
.input('Tooling_Name', Type.NVarChar, Tooling_Name)
      .input('ItemNo', Type.NVarChar, ItemNo)
      .input('MC', Type.NVarChar, MC)
      
      .input('Spec', Type.NVarChar, Spec)
      .input('Usage_pcs', Type.Int, Usage_pcs)
      .input('CT',Type.NVarChar,CT)
      .input('DwgRev', Type.NVarChar,DwgRev)
      .input('MCNo', Type.NVarChar, MCNo)

      .input('Qty', Type.Int, Qty)
      .input('Result1', Type.Int, Result1)
      .input('Result2', Type.Int, Result2)
      .input('Result3', Type.Int, Result3)
      .input('Result4', Type.Int, Result4)
      .input('Result5', Type.Int, Result5)
      .input('Result6', Type.Int, Result6)

      .input('Division', Type.NVarChar, Division)
      .input('revPart', Type.NVarChar, revPart)
      .input('_Case', Type.NVarChar, Case)
      .input('dateOfReq', Type.Date, dateOfReq);
      
      result.query(`EXEC [trans].[tb_Request_Insert] @PartNo, @ItemNo, @MC, @Process, @Spec, @Usage_pcs, @MCNo, @Qty, @Result1, @Result2, @Result3, @Result4, @Result5, @Result6, @Division, @revPart, @Case, @dateOfReq
      `);
    

    await transaction.commit();
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
//       MC,
//       Process,
//       Spec,
//       Usage_Pcs,
//       MC_No,
//       Qty,
//       Result1,
//       Result2,
//       Result3,
//       Result4,
//       Result5,
//       Result6,
//       Division,
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
//       .input("MC", Type.NVarChar, MC)
//       .input("Process", Type.NVarChar, Process)
//       .input("Spec", Type.NVarChar, Spec)
//       .input("Usage_Pcs", Type.NVarChar, Usage_Pcs)
//       .input("MCNo", Type.NVarChar, MCNo)
//       .input("Qty", Type.NVarChar, Qty)
//       .input("Result1", Type.NVarChar, Result1)
//       .input("Result2", Type.NVarChar, Result2)
//       .input("Result3", Type.NVarChar, Result3)
//       .input("Result4", Type.NVarChar, Result4)
//       .input("Result5", Type.NVarChar, Result5)
//       .input("Result6", Type.NVarChar, Result6)
//       .input("Division", Type.NVarChar, Division)
//       .input("DwgRev", Type.NVarChar, DwgRev)
//       .input("CT", Type.NVarChar, CT)
//       .input("ReqCase", Type.NVarChar, ReqCase)
//       .input("Req_Date_Request", Type.NVarChar, Req_Date_Request);

//     result.query(
//       "EXEC [trans].[tb_Request_Insert] @Part_No,@Item_No,@MC,@Process,@Spec,@Usage_Pcs,@MC_No,@Qty,@Result1,@Result2,@Result3,@Result4,@Result5,@Result6,@Division,@Dwg_Rev",
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
// .input('MC', Type.NVarChar, MC)
// .input('Process', Type.NVarChar, Process)
// .input('Spec', Type.NVarChar, Spec)
// .input('Usage_Pcs', Type.NVarChar, Usage_Pcs)
// .input('MC_No', Type.NVarChar, MC_No)
// .input('Qty', Type.NVarChar, Qty)
// .input('Result1', Type.NVarChar, Result1)
// .input('Result2', Type.NVarChar, Result2)
// .input('Result3', Type.NVarChar, Result3)
// .input('Result4', Type.NVarChar, Result4)
// .input('Result5', Type.NVarChar, Result5)
// .input('Result6', Type.NVarChar, Result6)
// .input('Division', Type.NVarChar, Division)
// .input('Dwg_Rev', Type.NVarChar, Dwg_Rev)
// .input('Req_Case', Type.NVarChar, Req_Case)
// .input('Req_Date_Request', Type.NVarChar, Req_Date_Request)
// .input('CT', Type.NVarChar, CT)

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
  insertSelectedRows,
  Post_PartNo,
  Post_Process,
  Post_MC,
  Post_ToolDetial,
};
