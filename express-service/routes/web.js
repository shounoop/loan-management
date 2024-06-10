const express = require('express')
const AWS = require('aws-sdk')
require(`dotenv`).config();
const loanTypeController = require('../controllers/loanTypeController')
const loanProductController = require('../controllers/loanProductController')
const documentStorage = require('../middlewares/documentStorage')
const loanMethodController = require('../controllers/loanMethodController')
const documentService = require('../services/documentService')
import { sendSimpleEmail } from '../services/emailService'
import { uploadFile, downloadFileS3 } from '../middlewares/AWSController';
let router = express.Router();

//set multer to upload file
const multer = require('multer')
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const Bucket = process.env.BUCKET_NAME
const s3 = new AWS.S3()
const upload = multer({ storage })
let initWebRouters = (app) => {

    //LoanType
    router.post('/api/create-loan-type', loanTypeController.createLoanType)
    router.get('/api/get-all-loan-type', loanTypeController.getAllLoanType)
    router.get('/api/get-loan-type-by-id', loanTypeController.getLoanTypeById)
    router.put('/api/edit-loan-type', loanTypeController.editLoanType)
    router.delete('/api/delete-loan-type', loanTypeController.deleteLoanType)

    //LoanProduct
    router.post('/api/create-loan-product', loanProductController.createLoanProduct)
    router.get('/api/get-all-loan-product', loanProductController.getAllLoanProduct)
    router.get('/api/get-loan-product-by-id', loanProductController.getLoanProductById)
    router.put('/api/edit-loan-product', loanProductController.editLoanProduct)
    router.delete('/api/delete-loan-product', loanProductController.deleteLoanProduct)

    //LoanMethod
    router.post('/api/create-loan-method', loanMethodController.createLoanMethod)
    router.get('/api/get-all-loan-method', loanMethodController.getAllLoanMethod)
    router.get('/api/get-loan-method-by-id', loanMethodController.getLoanMethodById)
    router.put('/api/edit-loan-method', loanMethodController.editLoanMethod)
    router.delete('/api/delete-loan-method', loanMethodController.deleteLoanMethod)
    //Document
    router.post('/api/create', documentStorage.createHTML)
    router.post('/api/generate', documentStorage.generateReport)

    //send mail testing
    router.post('/api/sendEmail', async (req, res) => {

        try {
            await sendSimpleEmail(req.body)
            return res.status(200).json({
                EC: 0,
                EM: 'Send email successfully',
            })
        } catch (e) {
            console.log(e)
            return res.status(500).json({
                EC: -1,
                EM: 'Error from server'
            })
        }
    })
    // test aws connection
    router.post('/api/upload', upload.any(), async (req, res) => {
        try {
            let fileName = []
            if (req.files) {
                for (const item of req.files) {
                    let data = await uploadFile(item.path, Bucket, item.filename)
                    fileName.push(data.key)
                }
                if (req.body.id) {
                    let infor = await documentService.savefile({
                        fileName: fileName,
                        id: 1,
                    })
                    res.status(200).json({ infor })
                } else {
                    res.status(404).json({
                        EC: 1,
                        EM: 'Cannot find object'
                    })
                }
            } else {
                res.status(200).json({
                    EC: 1,
                    EM: 'Not any file uploaded'
                })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                EC: -1,
                EM: 'Error from server'
            })
        }
    })
    router.get('/api/download/filename', downloadFileS3)

    return app.use("/", router)


}

module.exports = initWebRouters;