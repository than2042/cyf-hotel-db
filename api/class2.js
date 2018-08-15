const express = require('express');
const router = express.Router();

const filename = 'database/database.sqlite';
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database(filename);
db.run("PRAGMA foreign_keys = ON");

router.get('/customers', function(req, res) {
  var sql = 'select * from customers';

  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json({
      customers: rows
    });
  });
});


router.get('/customers/:id', function(req, res) {
  // TODO: add code here
  var sql = `select * from customers where id = ${req.params.id}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       rows[0]
    );
  });
});

router.get('/customers/search/:surname', function(req, res) {
  console.log(req.params.surname);
  // TODO: add code here
  var sql = `select * from customers where surname like '%${req.params.surname}%'`;

  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       {customers: rows}
    );
  });
});

router.post('/customers/', function(req, res) {
  var sql = `INSERT INTO customers
  (title, first_name, surname, email) VALUES ('${req.body.title}', '${req.body.firstName}', '${req.body.surname}', '${req.body.email}')`;
  db.run(sql);
  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }
  // TODO: add code here
  console.log(sql);
  console.log(req.body);
  res.status(200).json(
    {invoices: 2}
  );
});

// update data 
router.put('/customers/:id', function(req, res) {
  var sql = `update customers set surname = '${req.body.surname}' where id = ${req.body.id}`;
  db.run(sql);
  // EXPECTED JSON Object:
  // {
  //   title: 'Mr',
  //   firstname: 'Laurie',
  //   surname: 'Ainley',
  //   email: 'laurie@ainley.com'
  // }

  // TODO: add code here
  console.log(req.body);
  res.status(200).json(
    {rooms: 2}
  );
});

// get '/reservation
router.get('/reservations/', function(req, res) {
  // TODO: add code here
  var sql = `select * from reservations`;
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       rows
    );
  });
});

// get '/reservations/:id'
router.get('/reservations/:id', function(req, res) {
  // TODO: add code here
  var sql = `select * from reservations where id = ${req.params.id}`;
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       rows[0]
    )
  });
});

// delete '/reservations/:id'
// TODO: add code here
router.delete('/reservations/:id', function(req, res) {
  var sql = `DELETE from reservations where id = ${req.params.id}`;
  console.log(sql);
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       {customers: rows}
    )
  });
});

// get '/reservations/starting-on/:startDate'
// TODO: add code here
router.get("/reservations/starting-on/:check_in_date", function(req, res) {
  var sql = `select form reservations where check_in_date = '${req.params.check_in_date}'`;
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       {customers: rows}
    )
  });
});

// get '/reservations/active-on/:date'
// TODO: add code here
router.get("/reservations/active-on/:date", function(req, res) {
  // TODO: add code here
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       {customers: rows}
    )
  });
});

// post '/reservations'
router.post('/reservations/', function(req, res) {
// TODO: add code here
// EXPECTED JSON Object:
// {
//   customer_id: 1,
//   room_id: 1,
//   check_in_date: '2018-01-20',
//   check_out_date: '2018-01-22',
//   room_price: 129.90
// }
  var sql = `INSERT INTO reservations
  (customer_id, room_id, check_in_date, check_out_date, room_price) VALUES ('${req.body.customer_id}', '${req.body.room_id}', '${req.body.check_in_date}', '${req.body.check_out_date}', '${req.body.room_price}')`;
  db.all(sql, [], (err, rows) => {
    if (err) {
        console.log('ERROR fetching from the database:', err);
        return;
    }
    console.log('Request succeeded, new data fetched', rows);
    res.status(200).json(
       {customers: rows}
    )
  });
});



// get `/detailed-invoices'
// TODO: add code here


// get `/reservations/details-between/:from_day/:to_day`
// TODO: add code here

module.exports = router;

//select * from customers where surname