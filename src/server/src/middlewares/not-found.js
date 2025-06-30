const NotFound = (req, res) => {
  res.staus(404).send({ msg: "Route does not exist" });
};
module.exports = NotFound;
