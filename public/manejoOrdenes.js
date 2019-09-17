function onClickAddOrder(){
    var nroOrden = parseInt($("#formAddOrder").children("#orderNumber").val())
    var stateOrden = parseInt($("#formAddOrder").children("#orderState").val())
    var order = {
        id: nroOrden,
        number: nroOrden,
        state: stateOrden
    }

    if(validarOrden(order)){
        add(order)
        $("#formAddOrder").children("#orderNumber").val("")
    }
}

function onClickUpdateOrder(){
    var nroOrden = parseInt($("#formUpdateOrder").children("#orderNumber").val())
    var stateOrden = parseInt($("#formUpdateOrder").children("#orderState").val())
    var order = {
        id: nroOrden,
        number: nroOrden,
        state: stateOrden
    }

    if(validarOrden(order)){
        upd(order)
        $("#formUpdateOrder").children("#orderNumber").val("")
    }
}

function onClickDeleteOrder(){
    var nroOrden = parseInt($("#formDeleteOrder").children("#orderNumber").val())
    var order = {
        id: nroOrden,
        number: nroOrden,
        state: 0
    }

    if(validarOrden(order)){
        del(order)
        $("#formDeleteOrder").children("#orderNumber").val("")
    }
}

function validarOrden(order){
    return ((order != null && !isNaN(order.id) && !isNaN(order.number) && !isNaN(order.state)) == true)
}
