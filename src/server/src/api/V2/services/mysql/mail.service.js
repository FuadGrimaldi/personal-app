const { NotFoundError } = require("../../../../errors");
const Mail = require("../../models/mail.model");

const createMail = async (req) => {
  const result = await Mail.create({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  return result;
};

const getAllMail = async (page, limit) => {
  const offset = (page - 1) * limit;

  const { count, rows } = await Mail.findAndCountAll({
    limit: limit,
    offset: offset,
  });

  return {
    item: rows,
    total: count,
    page: page,
    limit: limit,
    totalPages: Math.ceil(count / limit),
  };
};

const updateMail = async (id, data) => {
  const result = await Mail.update(
    {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
    { where: { id } },
  );
  if (!result[0]) throw new NotFoundError("Mail not found or not updated");
  return await Mail.findByPk(id);
};

const getMailById = async (id) => {
  const item = await Mail.findByPk(id);
  return item;
};

const deleteMail = async (id) => {
  const item = await Mail.findByPk(id);
  await Mail.destroy({ where: { id } });
  return { message: "Mail deleted successfully" };
};

module.exports = {
  createMail,
  getAllMail,
  getMailById,
  updateMail,
  deleteMail,
};
