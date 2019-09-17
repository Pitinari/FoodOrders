function orders(onSuccess) {
    console.log('orders');
    $.ajax({
        url: "http://localhost:3000/api/orders",
        success: function (result) {
            onSuccess(result);
        }
    });
}

function add(order) {
    console.log('add');
    $.ajax({
        url: "/api/add",
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify({order: order}),
        success: function (data) {
            console.log(data);
        }
    });
}

function del(order) {
    console.log('del');
    $.ajax({
        url: "/api/delete",
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify({order: order}),
        success: function (data) {
            console.log(data);
        }
    });
}

function upd(order) {
    console.log('upd');
    $.ajax({
        url: "/api/update",
        type: "POST",
        contentType: "application/json", // send as JSON
        data: JSON.stringify({order: order}),
        success: function (data) {
            console.log(data);
        }
    });
}