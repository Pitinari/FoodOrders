let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(express.static('public'))
app.use(bodyParser.json());

let orders = [];

app.get('/api/orders', (req, res) => {
    res.send(orders);
});

app.post('/api/add', (req, res) => {
    orders.push(req.body.order);
    res.send(orders);
});

app.post('/api/update', (req, res) => {
    for (let order of orders) {
        if (order.id === req.body.order.id) {
            Object.assign(order, req.body.order);
        }
    }
    res.send(orders);
});

app.post('/api/delete', (req, res) => {
    console.log(req.body.order);
    orders = orders.filter((order) => {
        return !(order.id === req.body.order.id);
    })
    res.send(orders);
});

app.listen(3000, function () {
  console.log('order app listening on port 3000!');
});