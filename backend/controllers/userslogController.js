const { connectDb, closeDb, poolPromise } = require("../config/db.config");
var Type = require("mssql").TYPES;

const login = async (req, res) => {
    const { EmpCode, EmpPWD } = req.body;
    const user=await UserActivation.findOneByCode(empCode);
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('EmpCode', EmpCode);
        const result = await request.query('execute [trans].[tb_User_QueryBy_EmpCode] WHERE EmpCode = @EmpCode');
        if (result.recordset.length === 0) {
            return res.status(400).send('Invalid credentials');
        }

        const user = result.recordset[0];
        const EmpPWDIsValid = bcrypt.compareSync(EmpPWD, user.EmpPWD);
        if (!EmpPWDIsValid) {
            return res.status(401).send('Invalid credentials');
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

const register = async (req, res) => {
    const { EmpCode, EmpPWD } = req.body;
    try {
        const pool = await poolPromise;
        const request = pool.request();
        request.input('EmpCode', EmpCode);
        const result = await request.query('SELECT * FROM [dbo].[Users] WHERE EmpCode = @EmpCode');
        if (result.recordset.length > 0) {
            return res.status(400).send('EmpCode already exists');
        }

        const hashedEmpPWD = bcrypt.hashSync(EmpPWD, 8);
        const insertRequest = pool.request();
        insertRequest.input('EmpCode', EmpCode);
        insertRequest.input('EmpPWD', hashedEmpPWD);
        await insertRequest.query('INSERT INTO [dbo].[Users] (EmpCode, EmpPWD) VALUES (@EmpCode, @EmpPWD)');
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Server error');
    }
};



module.exports = {
    register,
    login
};