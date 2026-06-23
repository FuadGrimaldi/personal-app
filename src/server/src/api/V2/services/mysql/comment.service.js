const { NotFoundError } = require("../../../../errors");
const Comment = require("../../models/comment.model");
const Portofolio = require("../../models/portofolio.model");
const { getCache, setCache, deleteCache } = require("../redis/cache.service");

const createComment = async (req) => {
  const result = await Comment.create({
    fullname: req.body.fullname,
    message: req.body.message,
    id_porto: req.body.id_porto,
  });
  return result;
};

const checkComment = async (id) => {
  const result = await Comment.findOne({ where: { id } });
  if (!result) throw new NotFoundError("comment not found");
  return result;
};

const getAllComments = async ({ offset, limit, portofolio }) => {
  cacheKey = `comments:${offset}:${limit}:${portofolio || ""}`;
  const cachedData = await getCache(cacheKey);
  if (cachedData) {
    console.log("CACHE HIT");
    return cachedData;
  }
  console.log("CACHE MISS -> MYSQL");
  const where = {};
  if (portofolio) {
    where.id_porto = portofolio;
  }
  const { count, rows } = await Comment.findAndCountAll({
    where,
    offset,
    limit,
    include: [
      {
        model: Portofolio,
        as: "portofolio",
      },
    ],
    order: [["createdAt", "DESC"]], // biar urut terbaru dulu
  });
  const result = { comments: rows, total: count };
  await setCache(cacheKey, result, 300);
  return result;
};
const getCommentByIdPortofolio = async ({ id_porto, offset, limit }) => {
  const { count, rows } = await Comment.findAndCountAll({
    where: { id_porto },
    offset,
    limit,
    order: [["createdAt", "DESC"]], // biar urut terbaru dulu
  });

  return { comments: rows, total: count };
};

const deleteComment = async (id) => {
  const result = await Comment.destroy({ where: { id } });
  if (!result) throw new NotFoundError("comment not found");
  return result;
};

const updateComment = async (id, data) => {
  const result = await Comment.update(data, { where: { id } });
  if (!result[0]) throw new NotFoundError("comment not found");
  return result;
};

module.exports = {
  createComment,
  checkComment,
  getAllComments,
  deleteComment,
  updateComment,
  getCommentByIdPortofolio,
};
