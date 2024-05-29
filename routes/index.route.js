const express = require('express');
const router = express.Router();

const masterRequestsController = require('../controllers/masterRequestsController');
const docRequestsController = require('../controllers/docRequestsController');
// const memberController = require('../controllers/memberController');
const authController = require('../controllers/auth.controller');
const toolController = require('../controllers/toolController');

//Request
router.post('/requestTool', masterRequestsController.insertSelectedRows);
router.post('/Post_PartNo', masterRequestsController. Post_OPIST_PartNo);
router.post('/Post_Process', masterRequestsController. Post_OPIST_Process);
router.post('/Post_MC', masterRequestsController.Post_MC);
router.post('/Post_ToolDetial', masterRequestsController.Post_ToolDetial);
router.get('/Post_Detail', masterRequestsController.Post_Request_Detail)

//----------------------------------------------------------------------------//
router.post('/create', docRequestsController.create_DocRequest);
router.get('/get_docreq', docRequestsController.get_DocRequests);
router.get('/get_docreq/:Doc_No', docRequestsController.get_DocRequestById);
router.put('/update_docreq/:Doc_No', docRequestsController.update_DocRequestByID);
router.delete('/delete_docreq/:Doc_No', docRequestsController.delete_DocRequestByID);

//Employee
// router.get('/get_members',memberController.get_mem);
// router.get('/get_members/:Emp_Code',memberController.get_memByEmp_Code);
// router.post('/update_Member',memberController.update_MemberByCode);
// router.post('/Create_NewEmp',memberController.create_NewEmployee);
// router.delete('/delete_Member',memberController.delete_Employee);



//Login
router.post('/login', authController.login);
router.post('/register', authController.register);


//get tool
router.get('/get_tool',toolController.get_tool);
router.get('/getMasterToolingData',toolController.getMasterToolingData);

module.exports = router;

