const app = require("express")();
const mysql = require("mysql");
const configdb = {
  host: "mysql",
  user: "root",
  password: "root",
  database: "testdb",
};
const connection = mysql.createConnection(configdb);

app.get("/", (req, res) => {
  requestedName = req.query.name;
  connection.query(
    `INSERT INTO users (name) VALUES ("${requestedName || "Luis"}")`
  );
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      return res.status(500).send("Erro ao consultar o banco de dados");
    }
    const usersList = results.map((user) => `<li>${user.name}</li>`).join("");
    res.send(`<h1>Full Cycle Rocks!</h1><br><ul>${usersList}</ul>`);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`O servidor esta rodando na porta ${PORT}`);
});
