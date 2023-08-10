const { Customer, Banner } = require("../db");
const { Router } = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const {
  getAllBanners,
  getBannerById,
  deleteBanner,
} = require("../controllers/bannerController");

const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerIdBanners,
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
 * /customer/{id}:
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
router.get("/customer/:id", getCustomerById);


/**
 * @swagger
 * /customer:
 *   post:
 *     summary: Create a new customer
 *     description: Create a new customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       '200':
 *         description: Customer created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.post("/customer", createCustomer);

/**
 * @swagger
 * /update/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     description: Update a customer with the specified ID.
 *     tags:
 *       - Customer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the customer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               phone:
 *                 type: string
 *                 example: 123-456-7890
 *               password:
 *                 type: string
 *                 example: newpassword
 *     responses:
 *       '200':
 *         description: Customer updated successfully
 *       '404':
 *         description: Customer not found
 *       '500':
 *         description: Internal server error
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
router.get("/customers/banners/:id", getCustomerIdBanners);

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

const upload = multer({ storage });

//Get all images
router.get("/images", (req, res) => {
  const uploadsDirectory = path.join("upload");

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
 *     summary: Create a new banner
 *     description: Add a new banner to the database.
 *     tags: [Banner]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         description: Banner name
 *         required: true
 *         type: string
 *         minLength: 1
 *         maxLength: 100
 *         example: Banner one
 *       - in: formData
 *         name: image
 *         description: Banner image file
 *         required: require
 *         type: file
 *         save: image_data
 *       - in: formData
 *         name: endAt
 *         description: End date of the banner
 *         required: true
 *         type: string
 *         format: date
 *         example: 2023-06-01
 *       - in: formData
 *         name: startAt
 *         description: Start date of the banner
 *         required: true
 *         type: string
 *         format: date
 *         example: 2023-05-31
 *       - in: formData
 *         name: status
 *         description: Status of the banner
 *         required: true
 *         type: boolean
 *         example: true
 *       - in: formData
 *         name: customerId
 *         description: ID of the customer associated with the banner
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Banner created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    let info = {
      name: req.body.name,
      image: req.file?.path, // Validar si req.file existe antes de acceder a su propiedad
      endAt: req.body.endAt,
      startAt: req.body.startAt,
      status: req.body.status,
      customerId: parseInt(req.body.customerId),
    };

    // Verifica si la propiedad "image" se proporciona adecuadamente
    if (!info.image) {
      return res.status(400).json({ msg: "Image is required" });
    }

    // Guarda en la base de datos
    const newBanner = await Banner.create(info);
    res.status(200).json({ msg: "Banner created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Internal server error" });
  }
});


//update a banner by id
/**
 * @swagger
 * /updatebanner/{id}:
 *   put:
 *     summary: Update a banner
 *     description: Update a banner.
 *     tags: [Banner]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: ID of the banner to update
 *       - in: formData
 *         name: name
 *         description: Banner name
 *         required: true
 *         type: string
 *         minLength: 1
 *         maxLength: 100
 *         example: Banner one
 *       - in: formData
 *         name: image
 *         description: Banner image file
 *         required: true
 *         type: string
 *         example: banner_image.jpg
 *       - in: formData
 *         name: endAt
 *         description: End date of the banner
 *         required: true
 *         type: string
 *         format: date
 *         example: 2023-06-01
 *       - in: formData
 *         name: startAt
 *         description: Start date of the banner
 *         required: true
 *         type: string
 *         format: date
 *         example: 2023-05-31
 *       - in: formData
 *         name: status
 *         description: Status of the banner
 *         required: true
 *         type: boolean
 *         example: true
 *       - in: formData
 *         name: customerId
 *         description: ID of the customer associated with the banner
 *         required: true
 *         type: integer
 *         example: 1
 *     responses:
 *       '200':
 *         description: Banner updated successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.put("/updatebanner/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { name, endAt, startAt, status, customerId } = req.body;
  const { filename } = req.file;

  try {
    // Buscar el banner por su ID
    const banner = await Banner.findOne({
      where: {
        id: id,
      },
    }); // Ajusta el ID del banner que se desea actualizar

    if (!banner) {
      return res.status(404).json({ error: "Banner not found" });
    }

    // Actualizar los campos del banner
    banner.name = name || banner.name;
    banner.endAt = endAt || banner.endAt;
    banner.startAt = startAt || banner.startAt;
    banner.status = status || banner.status;
    banner.customerId = customerId || banner.customerId;

    if (filename) {
      // Si se proporciona una nueva imagen, actualizar el campo de imagen
      banner.image = filename;
    }

    // Guardar los cambios en la base de datos
    await banner.save();

    res.json({ message: "Banner updated successfully" });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Error updating banner" });
  }
});

module.exports = router;
