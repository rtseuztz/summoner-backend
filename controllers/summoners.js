const { query } = require("../sql");
const getUser = async (req, res) => {
  const name = req.params.name;
  console.log(query);
  const rows = await query(`SELECT * FROM summoners WHERE name = '${name}'`);
  res.send(rows);
};
exports.getUser = getUser;
