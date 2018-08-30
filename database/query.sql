// question 2
select * from invoices;
select 
SUM(total) 
from invoices 
where invoice_date_time >='2017/05/01' 
and invoice_date_time <= '2017/09/31';
select SUM(total) 
from invoices 
where invoice_date_time >='2017/05/01'
and invoice_date_time <= '2017/09/31' 
and paid = 1;

// question 3 

select * from 
customers join 
(select customer_id, count(*) 
from reservations group by customer_id) 
as reservation_count 
on customer_id = reservation_count.customer_id;

select 
    customers.first_name, 
    customers.surname,
    t.reservation_count,
    t.customer_id 
from customers 
join (
    select customer_id, count(*) as reservation_count 
    from reservations 
    group by customer_id
) as t
on customers.id = t.customer_id;

SELECT 
customers.surname, 
customers.first_name, 
reservations.customer_id, 
COUNT(*) 
FROM reservations 
join customers 
on reservations.customer_id = customers.id 
GROUP BY customers.surname, 
customers.first_name, 
reservations.customer_id;

// question 4, 5

SELECT room_id, reservations.check_in_date, 
reservations.check_out_date, 
reservations.room_price, 
room_types.type_name, 
COUNT(*) 
FROM reservations 
JOIN rooms on rooms.id = reservations.room_id 
JOIN room_types on room_types.id = rooms.room_type_id
GROUP BY room_id;


// question 5

SELECT 
sea_view
FROM reservations 
JOIN rooms on 
reservations.room_id = room_id
where reservations.check_in_date >= '2018/08/21' 
ORDER BY sea_view;

// question 6

SELECT sea_view, 
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
and count (type_name) >= 5;

// question 7




// question 8
/reservations/details-between/:from_day/:to_day

SELECT customers.first_name, 
customers.surname, 
reservations.room_id,
room_types.type_name,
COUNT(*)
FROM reservations 
JOIN customers on 
reservations.customer_id = customers.id
JOIN room_types on room_types.id
where check_in_date >= '2017-07-11' 
and check_out_date <= '2017-07-20';

// question 9
/reservations-per-customer/

SELECT customers.id,
customers.first_name, 
customers.surname,
COUNT(*)
FROM reservations
JOIN customers on
reservations.customer_id = customers.id 
GROUP BY customers.id;

// question 10
SELECT reservations.room_id, 
SUM(room_price), 
AVG(room_price),
COUNT(*) 
FROM reservations GROUP BY room_id;

// question 11

SELECT DISTINCT rooms.id
FROM rooms
where rooms.id not in (
    SELECT reservations.room_id
    FROM reservations
    where 
        reservations.check_out_date between '2018-10-18' and '2018-10-22'
    and 
        reservations.check_in_date between '2018-10-18' and '2018-10-22'
);


