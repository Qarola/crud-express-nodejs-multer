const { Customer, Banner } = require("../db");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Create a customer
const createCustomer = async (req, res) => {
  const { name, email, phone, password } = req.body;
  console.log(req.body);
  const patternName = /^([a-zA-Z' ]+)$/;
  const patternPhone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  const patternEmail = /\S+@\S+\.\S+/;

  try {
    if (
      (name && !name.match(patternName)) ||
      (email && !email.match(patternEmail)) ||
      (phone && !phone.match(patternPhone))
    ) {
      return res.json({ msg: "Please enter correct data" });
    } else {
      const customer = await Customer.create(req.body);
      res.status(200).json({ success: true });
    }
  } catch (error) {
    console.log(error);
    res.status(500);
    return;
  }
};

//Get all customers
const getAllCustomers = async (req, res) => {
  let { name } = req.query;
  //console.log(name, "this is a query");
  if (name) {
    try {
      let customerDb = await Customer.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return res.status(200).json(customerDb);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  } else {
    try {
      return await Customer.findAll().then((data) => {
        if (data !== null) {
          res.status(200).send(data);
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  }
};

//Get customer by id
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  //console.log(id, "this is an id");
  try {
    const customer = await Customer.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
    return;
  }
};

//Update a customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;

  try {
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
        data: {},
      });
    }

    await customer.update({
      name,
      email,
      phone,
      password,
    });

    return res.json({
      message: "Customer updated",
      data: {
        id: customer.id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
    return;
  }
};

//Delete a customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await Customer.destroy({
      where: { id },
    });
    res.json({
      message: "Customer deleted",
      count: deleteCustomer,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};
//Get customerId from Banner
const getCustomerIdBanners = async (req, res) => {
  const { id } = req.params;
  //console.log("this is an id: ", id);
  try {
    const banners = await Banner.findAll({
      attributes: [
        "id",
        "name",
        "image",
        "endAt",
        "startAt",
        "status",
        "customerId",
      ],
      where: { customerId: id },
    });
    console.log("banners; ", banners);
    res.json(banners);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  getCustomerIdBanners,
};
































































































































//UPDATE A CUSTOMER (También funciona así)
/* const updateCustomer = async (req, res) => {
  const {id} = req.params;
  const { name, email, phone, password} = req.body;
  console.log(req.body)

  try {
    // Buscar el customer por su ID
    const customer = await Customer.findOne({
      where: {
        id: id,
      },
    }); // Ajusta el ID del customer que se desea actualizar

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Actualizar los campos del custumer
    customer.name = name || customer.name;
    customer.email = email || customer.email;
    customer.phone = phone || customer.phone;
    customer.password = password || customer.password;

    // Guardar los cambios en la base de datos
    await customer.save();

    res.json({ message: 'Successfully Updated Customer' });
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Error updating customer' });
  }
} 

//UPDATE A CUSTOMER (También funciona así)
  const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;
  console.log(req.body)

  try {
    const customer = await Customer.findOne({
      where: {
        id: id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
        data: {},
      });
    }

    if (name) {
      customer.name = name;
    }
    if (email) {
      customer.email = email;
    }
    if (phone) {
      customer.phone = phone;
    }
    if (password) {
      customer.password = password;
    }

    await customer.save();

    return res.json({
      message: "Customer updated",
      data: customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
    return;
  }
};  
 */
