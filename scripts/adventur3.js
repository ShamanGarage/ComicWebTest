
function adventure3()
{
    //Inicializamos todos los triggers de esta aventura
    let triggers = {};
    let docTriggers = getElem("Triggers3").childNodes;
    docTriggers.forEach(element => {
        let trId = element.id;
        if (trId != undefined)
        {
            console.log(trId)
            triggers[trId] = new Trigger(trId, element)
            if (getElem(trId.replace('_tr', '_')) != null)
                triggers[trId].add_new_panel(getElem(trId.replace('_tr', '_')))
            triggers[trId].set_active(false)
            triggers[trId].trObj.onclick = function(){triggers[trId].action()}
        }

    });
    getElem("3_02").style.opacity = "100%"
    triggers["3_tr03"].set_active(true)

    constelaciones = [false, false, false, false, false]

    componentes = [false, false, false, false, false]

    cell_img = ["3_05_6","3_06", "3_06_1", "3_06_2", "3_06_3", "3_06_4", "3_06_5", "3_06_6"]

    triggers["3_tr03"].add_new_trigger(triggers["3_tr04"])

    triggers["3_tr04"].trObj.onclick = function()
    {
        if (triggers["3_tr04"].active)
        {
            triggers["3_tr04"].action()
            for (let index = 1; index < 6; index++) {
                let i = index
                let trId = "3_tr04_" + i
                triggers[trId].set_active(true)
                //Redefinimos la funcion de hacer clic a cada constelacion
                triggers[trId].trObj.onclick = function(){
                    if (triggers[trId].active)
                    {
                        //Hacemos que se notifique el clic
                        constelaciones[i - 1] = true
                        triggers[trId].action()
                        //Si se han clicado todas las constelaciones, mostramos
                        //la celula y activamos los triggers de cada componente
                        if(all_true(constelaciones))
                        {
                            getElem("3_05").style.opacity = "100%"
                            for (let j = 1; j < 6; j++) {
                                let j2 = j
                                let subTrId = "3_tr05_" + j2
                                triggers[subTrId].set_active(true)
                                //Redefinimos la funcion de hacer clic a cada componente
                                triggers[subTrId].trObj.onclick = function(){
                                    componentes[j2 - 1] = true
                                    triggers[subTrId].action()
                                    //Si ya estan todas las componentes en la celula
                                    //las cambiamos por la imagen total y activamos el trigger
                                    //para compactar todos los elementos
                                    if (all_true(componentes))
                                    {
                                        for (let k = 1; k < 6; k++) {
                                            let subId = "3_05_" + k
                                            getElem(subId).style.opacity = "0%"
                                        }
                                        getElem("3_05_6").style.opacity = "100%"
                                        set_image_sequence_tr(triggers["3_tr06"], triggers["3_tr07"], cell_img, 8)
                                        triggers["3_tr06"].set_active(true)
                                    }
                                }
                            }
                        }
                    }

                }
            }
        }
    }

    triggers["3_tr07"].add_new_trigger(triggers["3_tr07_1"])
    triggers["3_tr07_1"].add_new_trigger(triggers["3_tr07_2"])
    triggers["3_tr07_2"].add_new_trigger(triggers["3_tr07_3"])
    triggers["3_tr07_3"].add_new_trigger(triggers["3_tr07_4"])
    triggers["3_tr07_4"].add_new_trigger(triggers["3_tr07_5"])
    triggers["3_tr07_5"].add_new_trigger(triggers["3_tr08"])
    triggers["3_tr08"].add_new_trigger(triggers["3_tr08_1"])

    triggers["3_tr08_1"].add_new_trigger(triggers["3_tr08_2"])
    triggers["3_tr08_2"].add_new_trigger(triggers["3_tr08_3"])
    triggers["3_tr08_3"].add_new_trigger(triggers["3_tr08_4"])
    triggers["3_tr08_4"].add_new_trigger(triggers["3_tr08_5"])
    triggers["3_tr08_5"].add_new_trigger(triggers["3_tr09_1"])
    triggers["3_tr09_1"].add_new_panel(getElem("3_09_2"))

    function organs(){
        console.log("organos")
    }

    organs_drag_reset = null;

    triggers["3_tr09_1"].trObj.onclick = function()
    {
        if (triggers["3_tr09_1"].active)
        {
            triggers["3_tr09_1"].action();
            rocoso_drag_reset = dragElement(getElem("3_09_1"), getElem("drag_area_3_09_1"), "images/3/09_1.png", "images/3/09_1.png",getElem("drop_area_3_09_1"), false, organs);
        }
    }
}
