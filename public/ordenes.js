function updateListaOrdenes(){
    $.ajax({
        url: "http://localhost:3000/api/orders",
        success: function (result) {
            updateHTML(result);
        }
    });
}


Array.prototype.diff = function(b) {
    let bIds = [];
    b.forEach((obj) => {
        bIds[obj.id] = obj;
    });

    return this.filter((obj) => !(obj.id in bIds && obj.state == bIds[obj.id].state))
}



const EN_PREPARACION = 0
const LISTO = 1
const ENTREGADO = 2

let ordenes = [];
function updateHTML(pedidos){
    console.log('Actualizando ordenes')
    let container = $('#tabla')

    // container.empty()

    pedidos = pedidos.filter((a) => a.state != ENTREGADO)

    pedidos = pedidos.sort((a, b) => a.state - b.state);

    let agregados  = pedidos.diff(ordenes);
    let eliminados = ordenes.diff(pedidos);


    ordenes = pedidos.sort((a, b) => b.state - a.state);
    agregados = agregados.sort((a, b) => b.state - a.state);

    eliminados.forEach((pedido) => {
        let div = $('#' + 'orden' + pedido.id);
        div.animate({up:"100px",height:"0px"},1000)
        setTimeout(() => {
            div.remove();
        },1000)
        //div.remove();
    });

    agregados.forEach(pedido => {
        var div = $(document.createElement("div"))
        div.css(styles.div);
        div.attr('id', 'orden' + pedido.number);
        div.addClass('list-item');

        var pNro = $(document.createElement("h1"))
        pNro.css(styles.nro)

        var pState = $(document.createElement("h1"))
        pState.css(styles.textState)

        var iState = $(document.createElement("img"))
        iState.css(styles.imgState)
        iState.click(() => {
            let idParent = iState.parent().attr("id");
            idParent = idParent.slice(5,20);
            let nroOrden = parseInt(idParent);
            let order = {
                id: nroOrden,
                number: nroOrden,
                state: (pedido.state)+1
            }
            upd(order);
        })

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

        div.css({backgroundColor: '#eeeeee', height: "0"})

        let anteriorId =  ordenes.indexOf(pedido) - 1;
        if (anteriorId >= 0) {
            let nose = '#' + 'orden' + ordenes[anteriorId].id;
            let anterior = $(nose);
            anterior.after(div);
            console.log('ant');
        } else {
            console.log('padre');
            container.append(div)
        }
        div.animate({down : '100px', height: '+=100px'},1000)
    });
}


let styles = {
    div: {
        backgroundColor: "#eeeeee",
        display:"flex",
        justifyContent:"space-around",
        alignItems:"center",
        borderBottom: "1px solid gray"
    },
    nro: {
        flexBase: 0,
        flexGrow: 1,
        textAlign: "center"
    },
    textState: {
        flexBase:0,
        flexGrow: 3,
        textAlign: 'center',
        width: "30%"
    },
    imgState: {
        flexBase:0,
        height: "50%",
        width: "auto",
        flexGrow: 1
    }
}
