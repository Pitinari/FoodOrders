function updateListaOrdenes(){
    $.ajax({
        url: "http://localhost:3000/api/orders",
        success: function (result) {
            updateHTML(result);
        }
    });
}

const LISTO = 0
const EN_PREPARACION = 1
const ENTREGADO = 2

function updateHTML(pedidos){
    console.log('Actualizando ordenes')

    var container = $('#tabla')

    container.empty()

    if(pedidos == null) return

    console.log(pedidos)

    pedidos = pedidos.filter((a) => a.state != ENTREGADO)
    pedidos = pedidos.sort((a, b) => a.state - b.state)

    for (var pedido of pedidos) {

        var div = $(document.createElement("div"))
        div.attr("style","display:flex;justify-content:space-around;align-items:center;");
        var pNro = $(document.createElement("h1"))
        var pState = $(document.createElement("p"))
        var iState = $(document.createElement("img"))
        iState.attr("width","30px")
        iState.attr("height","30px")

        var estado = "";
        if(pedido.state == EN_PREPARACION){
            estado ="En preparacion"
            iState.attr("src","./icons/en-proceso.svg")
        }
        else if(pedido.state == LISTO){
            estado = "Listo"
            iState.attr("src","./icons/hecho.svg")
        }

        pNro.text(pedido.number)
        pState.text(estado)

        div.append(pNro)
        div.append(pState)
        div.append(iState)

        div.css({backgroundColor: '#eeeeee', height: "100px"})

        container.append(div)
    }
}

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