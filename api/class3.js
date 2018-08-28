const express = require('express');
const sqlite3 = require( 'sqlite3' ).verbose();

const filename = 'database/database.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

// get '/reservations-and-invoices/'
router.get('/reservations-and-invoices/', (req,res) => {
var sql = `SELECT * 
  FROM reservations 
  JOIN invoices on 
  reservations.id = 
  invoices.reservation_id`;

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

// get `/reservations-per-customer/`
// TODO: add code here
router.get('/reservations-per-customer/', (req, res) => {
  var sql = `SELECT 
  customers.surname, 
  customers.first_name, 
  reservations.customer_id, 
  COUNT(*) 
  FROM reservations 
  join customers 
  on reservations.customer_id = customers.id 
  GROUP BY customers.surname, 
  customers.first_name, 
  reservations.customer_id`;

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


// TODO: add code here

router.delete('/reservations/:id', (req, res) => {
  const id = req.params.id;
  const sql = `delete from reservations where id = ${id}`;

  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log(`Successfully removed reservation: ${id}`);
    res.status(200).json({
      message: "Successfully removed reservation " + id
    });
  });
});

router.get('/reservations/:customer/', (req, res) => {
  console.log(req)
  const customer = req.params.customer;
  const sql = `select * from reservations where customer_id = ${customer}`;

  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log(`Successfully removed reservation: ${id}`);
    res.status(200).json({
      message: "Successfully removed reservation " + id
    });
  });
});

// HOMEWORK
// get '/reservations/details-between/:from_day/:to_day'
// TODO: add for code here
router.get('/reservations/details-between/:from_day/:to_day', (req, res) => {
  var sql = `SELECT customers.first_name, 
  customers.surname, 
  reservations.room_id,
  room_types.type_name,
  COUNT(*)
  FROM reservations 
  JOIN customers on 
  reservations.customer_id = customers.id
  JOIN room_types on room_types.id
  where check_in_date >= '2017-07-11' 
  and check_out_date <= '2017-07-20'
  `;

  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log(`Successfully removed reservation: ${id}`);
    res.status(200).json({
      message: "Successfully removed reservation " + id
    });
  });
});



// HOMEWORK
// get '/reservations-per-customer/'
// TODO: add code here
router.get('/reservations-per-customer/', (req, res) => {
var sql = ``

  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log(`Successfully removed reservation: ${id}`);
    res.status(200).json({
      message: "Successfully removed reservation " + id
    });
  }); 
});

// HOMEWORK
// get `/stats-price-room/`
// TODO: add code here
router.get('/stats-price-room/', (req, res) => {
  var sql = ``;
  
  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log(`Successfully removed reservation: ${id}`);
    res.status(200).json({
      message: "Successfully removed reservation " + id
    });
  }); 

})

// HOMEWORK
// get `/rooms/available-in/:from_day/:to_day`
// TODO: add code here
router.get('/rooms/available-in/:from_day/:to_day', (req, res) => {
  var sql = ``

  db.run(sql, (err, rows) => {
    if (err) {
      console.log('ERROR fetching from the database:', err);
      return;
    }

    console.log(`Successfully removed reservation: ${id}`);
    res.status(200).json({
      message: "Successfully removed reservation " + id
    });
  }); 
})

module.exports = router;
