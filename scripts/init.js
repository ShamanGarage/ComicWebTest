let cubeTr = new Trigger("cube", getElem("cubTr"))

let c1Tr = new Trigger("c1", getElem("c1Tr"))
let c2Tr = new Trigger("c2", getElem("c2Tr"))
let c3Tr = new Trigger("c3", getElem("c3Tr"))
let c4Tr = new Trigger("c4", getElem("c4Tr"))

cubeTr.add_new_trigger(c4Tr)
cubeTr.add_new_panel(getElem("theSquares"))
cubeTr.set_active(true)
getElem("cubTr").onmousedown = function(){cubeTr.action();}

c1Tr.add_old_trigger(c2Tr)
c1Tr.add_old_trigger(c3Tr)
c1Tr.add_old_trigger(c4Tr)

c2Tr.add_old_trigger(c1Tr)
c2Tr.add_old_trigger(c3Tr)
c2Tr.add_old_trigger(c4Tr)

c3Tr.add_old_trigger(c1Tr)
c3Tr.add_old_trigger(c2Tr)
c3Tr.add_old_trigger(c4Tr)

c4Tr.add_old_trigger(c1Tr)
c4Tr.add_old_trigger(c2Tr)
c4Tr.add_old_trigger(c3Tr)
let adv4_clone = getElem("Triggers4").cloneNode(true)
c4Tr.trObj.onclick =  function(){
    if (c4Tr.active)
    {
        getElem("Triggers").replaceChild(adv4_clone, getElem("Triggers4"))
        adventure4()
        c4Tr.action()
    }
}

getElem("facetoUX").onclick = function()
{
    save_adventure("adventure4")
}

