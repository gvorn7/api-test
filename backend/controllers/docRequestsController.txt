const { connectDb, closeDb } = require("../config/db.config");

//note from p.Korn to use with postman✨

//http://localhost:3000/createDocRequest

// let docNoCounter = 1;
//doc generated for each request
// let docNoCounter = 0;

// const createDocRequest = (req, res) => {
//   const { Req_ID, Status } = req.body;
//   const Doc_No = `A${(docNoCounter + 1).toString().padStart(6, '0')}`;
//   docNoCounter++;

//   const query = `INSERT INTO Doc_Request (Req_ID, Status, Doc_No) VALUES (@Req_ID, @Status, @Doc_No)`;
//   sql.query(query, [Req_ID, Status, Doc_No], (err, result) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json({ message: 'Document request created successfully' });
//     }
//   });
// };

exports.create_DocRequest = async function (req, res) {
  try {
    const { Req_ID, Status } = req.body;
    let docNoCounter = 0;
    const Doc_No = `A${(docNoCounter + 1).toString().padStart(6, "0")}`;
    docNoCounter++;

    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("Req_ID", Req_ID)
      .input("Status", Status)
      .input("Doc_No", Doc_No)
      .query(
        "INSERT INTO Doc_Request (Req_ID, Status, Doc_No) VALUES (@Req_ID, @Status, @Doc_No)"
      );

    res.status(201).json({ message: "Document request created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.get_DocRequests = async function (req, res) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Doc_Request");

    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.get_DocRequestById = async function (req, res) {
  try {
    const pool = await poolPromise;
    const Doc_No = req.params.Doc_No;
    const result = await pool
      .request()
      .input("Doc_No", Doc_No)
      .query("SELECT * FROM Doc_Request WHERE Doc_No = @Doc_No");

    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


const update_DocRequestByID = async (req, res) => {
  try {
    const db = await connectDb();
    const Doc_No = req.params.Doc_No;
    const { Req_ID, Status } = req.body;
    const query = `UPDATE Doc_Request SET Req_ID = @Req_ID, Status = @Status WHERE Doc_No = ${Doc_No}`;
    await db.query(query, [Req_ID, Status]);
    res.json({ message: "Document request updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    await closeDb();
  }
};

const delete_DocRequestByID = async (req, res) => {
  try {
    const db = await connectDb();
    const Doc_No = req.params.Doc_No;
    const query = `DELETE FROM Doc_Request WHERE Doc_No = ${Doc_No}`;
    await db.query(query);
    res.json({ message: "Document request deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  } finally {
    await closeDb();
  }
};

module.exports = {
  get_DocRequests,
  create_DocRequest,
  get_DocRequestById,
  update_DocRequestByID,
  delete_DocRequestByID,
};
