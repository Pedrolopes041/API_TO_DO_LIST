const notFoundError = (res) => {
  return res.status(404).send("Este dado não foi encontrado!");
};

module.exports = {
  notFoundError,
};
