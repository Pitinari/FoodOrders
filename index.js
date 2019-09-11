let express = require('express');
let bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

let orders = [];
fs.readFile('./orders.json', (err, data) => {
    if (err) {
        console.log(err);
    };
    orders = JSON.parse(data);
    console.log('Orders loaded');
});

function saveOrders(orders) {
    // fs.writeFile("orders.json", JSON.stringify(orders), 'utf8', function (err) {
    //     if (err) {
    //         console.log("couldn't save orders to file.");
    //     }
    //     console.log('saved orders'); 
    // });
}

app.get('/api/orders', (req, res) => {
    res.send(orders);
});

app.post('/api/add', (req, res) => {
    orders.push(req.body.order);
    saveOrders(orders);
    res.send(orders);
});

app.post('/api/update', (req, res) => {
    for (let order of orders) {
        if (order.id === req.body.order.id) {
            Object.assign(order, req.body.order);
        }
    }
    saveOrders(orders);
    res.send(orders);
});

app.post('/api/delete', (req, res) => {
    console.log(req.body.order);
    orders = orders.filter((order) => {
        return !(order.id === req.body.order.id);
    })
    saveOrders(orders);
    res.send(orders);
});

app.post('/api/delete-all', (req, res) => {
    orders = [];
    saveOrders(orders);
    res.send(orders);
});

app.listen(3000, function () {
    console.log('order app listening on port 3000!');
});