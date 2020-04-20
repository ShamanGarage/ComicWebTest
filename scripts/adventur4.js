let adventure4_initialized = false

function adventure4()
{
    //Inicializamos todos los triggers de esta aventura
    let triggers = {};
    let docTriggers = getElem("Triggers4").childNodes;
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
    getElem("4_03").style.opacity = "100%"

    triggers["4_tr04"].set_active(true)
    triggers["4_tr04"].add_new_panel(getElem("4_04b"))

    triggers["4_tr04"].add_new_trigger(triggers["4_tr04_1_1"])//La escalera activa el trigger de la planta
    triggers["4_tr04"].add_new_trigger(triggers["4_tr04_2_1"])//La escalera activa el trigger de los tubos

    triggers["4_tr04_1_1"].add_new_trigger(triggers["4_tr04_1_2"])//Cadena desde la planta
    triggers["4_tr04_1_2"].add_new_trigger(triggers["4_tr04_1_3"])

    triggers["4_tr04_2_1"].add_new_trigger(triggers["4_tr04_2_2"])//Cadena desde los tubos

    //Ahora hacemos que el mini-mapa se active solo cuando se active
    //la planta y el tubo
    let plant_b = false;
    let tube_b = false;

    //La planta al activarse intenta activar el mini-mapa
    triggers["4_tr04_1_1"].trObj.onclick = function(){
        if(triggers["4_tr04_1_1"].active)
        {
            plant_b = true;
            triggers["4_tr05"].set_active(plant_b && tube_b)
            triggers["4_tr04_1_1"].action()
            if (plant_b && tube_b)
                getElem("4_04_3").style.opacity = "100%"
        }
    }

    //Los tubos al activarse intentan activar el mini-mapa
    triggers["4_tr04_2_1"].trObj.onclick = function(){
        if(triggers["4_tr04_2_1"].active)
        {
            tube_b = true;
            triggers["4_tr05"].set_active(plant_b && tube_b)
            triggers["4_tr04_2_1"].action()
            if (plant_b && tube_b)
                getElem("4_04_3").style.opacity = "100%"
        }
    }

    //Los trigger de los puzzles se activaran cuando se accione el de
    //la montaña pequeña y cuando todos los triggers se accionen se
    //cambiará la acción al pulsar la montañita
    let puzzle_bools = [false, false, false, false, false, false]

    i = 0
    let mountainIndex;
    while (i < 6)
    {
        let index = i
        let trId = "4_tr06_" +(i + 1).toString()
        console.log(trId)
        triggers["4_tr05"].add_new_trigger(triggers[trId])
        triggers[trId].trObj.onclick = function(){
            if (triggers[trId].active)
            {
                puzzle_bools[index] = true;
                if (all_true(puzzle_bools))
                {
                    triggers["4_tr07b"].set_active(true)
                    triggers["4_tr07b"].trObj.onclick =  function(){
                        if (triggers["4_tr07b"].active)
                        {
                            getElem("4_07b").style.opacity = "100%"
                            getElem("4_07_1").style.opacity = "100%"
                            let imgList = ["07_2.png","07_3.png","07_4.png"]
                            triggers["4_tr07"].set_active(true)
                            set_image_sequence_tr(triggers["4_tr07"], triggers["4_tr08"], "images/4/" ,imgList, 3, mountainIndex, getElem("4_07_1"))
                            triggers["4_tr07b"].set_active(false)
                        }
                    }
                }
                triggers[trId].action()
            }
        }
        i += 1
    }

    //Ahora toca el zoom a la puerta y romperla
    triggers["4_tr08"].add_new_panel(getElem("4_09_1"))
    triggers["4_tr08"].add_new_trigger(triggers["4_tr09"])
    let doorImg = ["09_2.png","09_3.png", "09_4.png","09_5.png"]
    let doorIndex
    set_image_sequence_tr(triggers["4_tr09"], triggers["4_tr10"], "images/4/", doorImg, 4, doorIndex, getElem("4_09_1"))

    triggers["4_tr10"].add_new_trigger(triggers["4_tr10_1"])
    triggers["4_tr10_1"].add_new_trigger(triggers["4_tr10_2"])
    triggers["4_tr10_2"].add_new_trigger(triggers["4_tr10_3"])
    triggers["4_tr10_3"].add_new_trigger(triggers["4_tr12_1"])
    triggers["4_tr10_3"].add_new_panel(getElem("4_11"))
    triggers["4_tr12_1"].add_new_trigger(triggers["4_tr12_2"])
    triggers["4_tr12_1"].add_new_trigger(triggers["4_tr12_3"])
    triggers["4_tr12_1"].add_new_trigger(triggers["4_tr12_4"])
    triggers["4_tr12_1"].add_new_trigger(triggers["4_tr12_5"])
    triggers["4_tr12_5"].add_new_panel(getElem("4_12_5b"))


    triggers["4_tr13"].add_new_trigger(triggers["4_tr13_02"])
    triggers["4_tr13"].add_new_panel(getElem("4_13"))
    triggers["4_tr13"].add_new_panel(getElem("4_13_01"))
    triggers["4_tr13"].add_new_panel(getElem("4_14_1"))
    triggers["4_tr13"].add_new_panel(getElem("4_14_2"))

    function hole(){
        triggers["4_tr13"].set_active(true)
    }

    triggers["4_tr12_5"].trObj.onclick = function()
    {
        triggers["4_tr12_5"].action();
        dragElement(getElem("4_12_5"), getElem("drag_area_4_12_5"), "images/4/12_5_h.png", "images/4/12_5_d.png",getElem("drop_area_4_12_5"), false, hole);
    }

    for (let index = 2; index < 10; index++) {
        let i = index;
        let tr_id = "4_tr13_0" + i;
        triggers[tr_id].trObj.onclick = null;
        i += 1;
        if (i < 10)
            nb = "0" + i;
        else
            nb = i;
        i -= 2;
        if (i < 10)
            nb_old = "0" + i;
        else
            nb_old = i;
        triggers[tr_id].add_new_trigger(triggers["4_tr13_" + nb])
        triggers[tr_id].add_old_panel(getElem("4_13_" + nb_old))
        triggers[tr_id].trObj.onmouseover = function(){
            triggers[tr_id].action()
            //triggers[tr_id].onmouseover = null;
        }

    }
}
