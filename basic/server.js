const express = require('express');
const app = express();
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');

const client = '/';
const port = process.env.PORT || 3000;

app.use(serveStatic(__dirname + client));

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(port,function(){
  console.log("http://localhost:" + port);
});

app.get('/clicked', (req, res) => {
  res.send('<p>Você clicou no botão</p>')
});

app.get('/contact/1/edit', (req, res) => {
  res.send(`<form hx-put="/contact/1" hx-target="this" hx-swap="outerHTML">
  <div>
    <label>First Name</label>
    <input type="text" name="firstName" value="Joe">
  </div>
  <div class="form-group">
    <label>Last Name</label>
    <input type="text" name="lastName" value="Blow">
  </div>
  <div class="form-group">
    <label>Email Address</label>
    <input type="email" name="email" value="joe@blow.com">
  </div>
  <button class="btn">Submit</button>
  <button class="btn" hx-get="/contact/1">Cancel</button>
</form>`)
});

app.put('/contact/1', (req, res) => {
  const name = req.body.firstName;
  const lastname = req.body.lastName;
  const email = req.body.email;

  res.send(`<div hx-target="this" hx-swap="outerHTML">
  <div><label>First Name</label>: ${name}</div>
  <div><label>Last Name</label>: ${lastname}</div>
  <div><label>Email</label>: ${email}</div>
  <button hx-get="/contact/1/edit" class="btn btn-primary">
  Click To Edit
  </button>
</div>`)
});
