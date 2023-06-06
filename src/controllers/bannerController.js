const { Customer, Banner } = require("../db");
const path = require("path");
const fs = require("fs");

const multer = require("multer");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Get all banners
const getAllBanners = async (req, res) => {
  let { name } = req.query;
  console.log(name, "this is a query");
  if (name) {
    try {
      let bannerDb = await Banner.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      return res.status(200).json(bannerDb);
    } catch (error) {
      console.log(error);
      res.status(500);
      return;
    }
  } else {
    try {
      return await Banner.findAll({
        include: [
          {
            model: Customer,
            attributes: ["id", "name", "email"],
          },
        ],
      }).then((data) => {
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

//Get banner by id
const getBannerById = async (req, res) => {
  const { id } = req.params;
  console.log(id, "this is an id");
  try {
    let banner = await Banner.findOne({
      where: {
        id: id,
      },
    });
    return res.status(200).json(banner);
  } catch (error) {
    console.log(error);
    res.status(500);
    return;
  }
};

//Delete a banner
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBanner = await Banner.destroy({
      where: { id },
    });
    res.json({
      message: "Banner deleted",
      count: deleteBanner,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      data: {},
    });
  }
};

module.exports = {
  getAllBanners,
  getBannerById,
  deleteBanner,
};
