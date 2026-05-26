const {
  createMail,
  getAllMail,
  getMailById,
  updateMail,
  deleteMail,
} = require("../services/mysql/mail.service");
const { customResponse } = require("../../../helpers/responseHelpers");
const { transporter } = require("../../../../config/mail");
const config = require("../../../../config/config");
const adminMail = require("../../../../views/mail/admin");
const userMail = require("../../../../views/mail/user");

const findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const mails = await getAllMail(page, limit);
    res
      .status(200)
      .json(customResponse(200, "Mails retrieved successfully", mails));
  } catch (err) {
    console.error(err);
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const findOne = async (req, res, next) => {
  try {
    const mail = await getMailById(req.params.id);
    res
      .status(200)
      .json(customResponse(200, "Mail retrieved successfully", mail));
    return res.status(200).json(mail);
  } catch (err) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const create = async (req, res) => {
  try {
    const created = await createMail(req);
    // EMAIL KE ADMIN
    await transporter.sendMail({
      ...adminMail(config, created),
    });
    await transporter.sendMail({
      ...userMail(config, created),
    });

    return res
      .status(201)
      .json(customResponse(201, "Mail created successfully", created));
  } catch (err) {
    console.error(err);

    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || "Internal Server Error";

    return res
      .status(statusCode)
      .json(customResponse(statusCode, errorMessage, null));
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const updated = await updateMail(id, payload);
    res
      .status(200)
      .json(customResponse(200, "Mail updated successfully", updated));
  } catch (err) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await deleteMail(id);
    res
      .status(200)
      .json(customResponse(200, "Mail deleted successfully", null));
  } catch (err) {
    const statusCode = error.statusCode || 500;
    const errorMessage = error.message || "Internal Server Error";
    res.status(statusCode).json(customResponse(statusCode, errorMessage, null));
  }
};

module.exports = {
  findAll,
  findOne,
  create,
  update,
  remove,
};
