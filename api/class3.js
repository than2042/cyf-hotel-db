const express = require('express');
const sqlite3 = require( 'sqlite3' ).verbose();

const filename = 'database/database.sqlite';
let db = new sqlite3.Database(filename);

const router = express.Router();

// delete 
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

// question 1
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

// question 2
router.get('/reservations-and-invoices/total/:from_day/:to_day', (req, res) => {
  console.log(req.params);
  var fromDate = req.params.from_day;
  var toDate = req.params.to_day;
  console.log(fromDate, toDate);
  var sql = 
   `select SUM(total) 
    from invoices 
    where invoice_date_time >= '${fromDate}'
    and invoice_date_time <= '${toDate}' 
    and paid = 1`;
      
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

  // router.get('/hello/:name', (req, res) => {
  //   console.log(req.params);
  //   res.send("hello " + req.params.name);
  // })

// question 3
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

// question 4-5
// TODO: add code here
router.get('/reservations/rooms-details/', (req, res) => {
  var sql = `SELECT room_id, reservations.check_in_date, 
  reservations.check_out_date, 
  reservations.room_price, 
  room_types.type_name, 
  COUNT(*) 
  FROM reservations 
  JOIN rooms on rooms.id = reservations.room_id 
  JOIN room_types on room_types.id = rooms.room_type_id
  GROUP BY room_id`;

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

// question 6
router.get('/rooms/', (req, res) => {
  var sql = `SELECT sea_view, 
  reservations.check_in_date,
  reservations.check_out_date,
  reservations.room_id, 
  room_types.type_name, 
  COUNT(*)
  FROM reservations
  JOIN rooms on 
  reservations.room_id = rooms.id 
  JOIN room_types on room_types.id = rooms.room_type_id
  GROUP BY room_id 
  having rooms.sea_view = 1 
  and count (type_name) >= 5`;

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

router.get('/reservations/:customer/', (req, res) => {
  console.log(req);
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

// question 8
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

// question 9
// HOMEWORK
// get '/reservations-per-customer/'
// TODO: add code here
router.get('/reservations-per-customer/', (req, res) => {
var sql = `SELECT customers.id,
customers.first_name, 
customers.surname,
COUNT(*)
FROM reservations
JOIN customers on
reservations.customer_id = customers.id 
GROUP BY customers.id`;

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

// question 10
// HOMEWORK
// get `/stats-price-room/`
// TODO: add code here
router.get('/stats-price-room/', (req, res) => {
  var sql = `SELECT reservations.room_id, 
  SUM(room_price), 
  AVG(room_price),
  COUNT(*) 
  FROM reservations GROUP BY room_id`;
  
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

// question 11
// HOMEWORK
// get `/rooms/available-in/:from_day/:to_day`
// TODO: add code here
router.get('/rooms/available-in/:from_day/:to_day', (req, res) => {
  var fromDate = req.params.from_day;
  var toDate = req.params.to_day;
  var sql = `SELECT DISTINCT rooms.id
  FROM rooms 
  where rooms.id not in (
      SELECT reservations.room_id
      FROM reservations
      where 
          reservations.check_out_date between '${fromDate}' and '${toDate}'
      and 
          reservations.check_in_date between '${fromDate}' and '${toDate}'
  )`;

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
