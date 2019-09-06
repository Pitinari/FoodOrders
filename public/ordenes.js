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

    pedidos = pedidos.filter((a) => a.state != ENTREGADO)
    pedidos = pedidos.sort((a, b) => a.state - b.state)

    for (var pedido of pedidos) {

        var div = $(document.createElement("div"))
        var pNro = $(document.createElement("h1"))
        var pState = $(document.createElement("p"))

        var estado = "";
        if(pedido.state == EN_PREPARACION){
            estado ="En preparacion"
        }
        else if(pedido.state == LISTO){
            estado = "Listo"
        }
        
        pNro.text(pedido.number)
        pState.text(estado)

        div.append(pNro)
        div.append(pState)

        div.css({backgroundColor: '#eeeeee', height: "100px"})

        container.append(div)
    }
}