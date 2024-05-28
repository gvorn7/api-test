const { connectDb, closeDb, poolPromise } = require("../config/db.config");
const jwt = require('jsonwebtoken');
var Type = require("mssql").TYPES;

const login = async (req, res) => {

    try {

        const Emp_Code = req.body.Emp_Code;
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Emp_Code', Type.NVarChar, Emp_Code)
            .query('EXEC [trans].[stored_tb_Employee_Query] @Emp_Code');



        if (result.recordset.length === 0) {
            return res.status(401).json({ auth: false, message: 'Not Found This Employee Code' });
        }

        const user = result.recordset[0];

        const token = jwt.sign({ Emp_Code: user.Emp_Code }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ auth: true, message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ auth: false, message: 'Error on the server.' });
    }
};


const register = async (req, res) => {
    try {
        const Emp_Code = req.body.Emp_Code;
        const pool = await poolPromise;
        const result = await pool.request();

        result

            .input("a", Type.NVarChar, Emp_Code)
            .input("b", Type.NVarChar, req.body.Emp_Name)
            .input("c", Type.NVarChar, req.body.Emp_Surname)
            .input("d", Type.NVarChar, req.body.Emp_Pwd)
            .input("e", Type.NVarChar, req.body.Emp_Position)

        result.query(
            "EXEC [trans].[stored_tb_Employee_Insert]  @a, @b,@c,@d,@e",
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        success: true,
                        message: "Register successfully",
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
    login,
    register,
};
