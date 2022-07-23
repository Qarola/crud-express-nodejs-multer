const { Customer, Banner } = require("../db");
const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const {
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerBanners,
} = require("../controllers/customerController");

const router = Router();

//Customer routes

/**
 * @swagger
 * /customers:
 *   get:
 *    summary: Get all customers
 *    tags: [Customer]
 *    description: Get all customers
 *    responses:
 *     200:
 *        description: Success
 *
 *
 *
 */
router.get("/customers", getAllCustomers);
/**
 * @swagger
 * /customer:
 *   post:
 *      summary: Create a new customer
 *      description: Create a new customer
 *      tags: [Customer]
 *      parameters:
 *          - in: body
 *            name: Banner
 *            description: Create a new customer
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - email
 *                 - phone
 *                 - password
 *              properties:
 *                  name:
 *                      type: string
 *                      example: Dove
 *                  email:
 *                      type: string
 *                      example: dove@email.com
 *                  phone:
 *                      type: string
 *                      example:  1134567-8912
 *                  password:
 *                       type: string
 *                       example: abc123
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/customer", createCustomer); 

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *      summary: Get customer by id
 *      description: Get a customer by id
 *      tags:
 *          [Customer]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Customer by id
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/customers/:id", getCustomerById); 

/**
 * @swagger
 * /update/{id}:
 *   put:
 *      summary: Update a costomer
 *      description: Update a banner
 *      tags: [Customer]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Customer by id
 *            required: true
 *          - in: body
 *            name: Update
 *            description: Customer data
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - email
 *                 - phone
 *                 - password
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Navin
 *                  email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: amit@sample.com
 *                  phone:
 *                      type: string
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: abcd123
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.put("/update/:id", updateCustomer); 

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *      summary: Delete a customer
 *      description: Delete customer
 *      tags:
 *          [Customer]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Customer id
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.delete("/delete/:id", deleteCustomer); 

/**
 * @swagger
 * /customers/banners/{id}:
 *   get:
 *      summary: Get banner by customerId
 *      description: Get banner by  customerId
 *      tags:
 *          [Banner]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Get banner by  customerId
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/customers/banners/:id", getCustomerBanners); 

//Banner routes

/**
 * @swagger
 * /banners:
 *   get:
 *    summary: Get all banners
 *    tags:
 *     [Banner]
 *    description: Get all banners
 *    responses:
 *     200:
 *        description: Success
 *
 *
 *
 */
router.get("/banners", getAllBanners); 

/**
 * @swagger
 * /banners/{id}:
 *   get:
 *      summary: Get banner by id
 *      description: Get a banner by id
 *      tags:
 *          [Banner]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Banner by id
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.get("/banners/:id", getBannerById); 

/**
 * @swagger
 * /updatebanner/{id}:
 *   put:
 *      summary: Update a banner
 *      description: Update a banner
 *      tags: [Banner]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Banner by id
 *            required: true
 *          - in: body
 *            name: Update
 *            description: Banner data
 *            schema:
 *              type: object
 *              required:
 *                 - name
 *                 - customerId
 *              properties:
 *                  customerId:
 *                      type: integer
 *                      example: 1
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.put("/updatebanner/:id", updateBanner); 
/**
 * @swagger
 * /deletebanner/{id}:
 *   delete:
 *      summary: Delete a banner
 *      description: Delete banner
 *      tags:
 *          [Banner]
 *      parameters:
 *          - in: path
 *            name: id
 *            type: integer
 *            description: Banner id
 *            required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.delete("/deletebanner/:id", deleteBanner); 



//=============  multer configuration  ==============
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
    //upload only png and jpg format
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      return cb(new Error("Please, upload an image"));
    }
  },
  filename: function (req, file, cb) {
    //filename: It determines the file name inside the folder.
    const temp_file_arr = file.originalname.split(".");
    const temp_file_name = temp_file_arr[0];
    const temp_file_extension = temp_file_arr[1];

    cb(
      null,
      temp_file_name + "-" + Date.now() + "." + temp_file_extension,
      file.originalname
    );
  },
});

const uploads = multer({ storage });

//Get all images
router.get("/images", (req, res) => {
  const uploadsDirectory = path.join("uploads");

  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      return res.json({ msg: err });
    }
    if (files.length === 0) {
      return res.json({ msg: "No images uploaded" });
    }

    console.log(files);
    return res.json({ files });
  });
});

//Create a banner

/**
 * @swagger
 * /add:
 *   post:
 *      summary: Create a new banner
 *      description: Add a banner to DB.
 *      tags: [Banner]
 *      parameters:
 *          - in: formData
 *            type: string
 *            required:
 *            description: Banner data
 *            requestBody:
 *            content:
 *               image/png:
 *            schema:
 *              type: string
 *              format: binary
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: Banner one
 *                  image:
 *                      type: string
 *                      example: abc.png
 *                  customerId:
 *                      type: integer
 *                      example: 1
 *                  required: true
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
router.post("/add", uploads.single("image"), (req, res) => {
  try {
    let info = {
      name: req.body.name,
      image: req.file.path,
      endAt: req.body.endAt,
      startAt: req.body.startAt,
      status: req.body.status,
      customerId: req.body.customerId,
    };
     //Save to Banner Database
    const imgUpload = Banner.create(info);
    res.status(200).json({ msg: "File successfully created" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ msg: "File successfully created" });
  }
});

module.exports = router;
