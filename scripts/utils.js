class Trigger{
    constructor(tr_id, triggerObj)
    {
        this.id = tr_id;
        this.trObj = triggerObj;
        this.active = false;
        this.new_triggers = [];
        this.old_triggers = [];
        this.new_panels = [];
        this.old_panels = [];
    }
    set_active(state)
    {
        this.active = state;
        if(state)
        {
            this.trObj.style.zIndex = 1;
            console.log("Trigger " + this.id + " is now active")
        }
        else
        {
            console.log("Trigger " + this.id + " deactivate")
            this.trObj.style.zIndex = -1;
        }
    }
    set_new_triggers(state)
    {
        this.new_triggers.forEach(element => {
            element.set_active(state);
        });
    }
    set_old_triggers(state)
    {
        this.old_triggers.forEach(element => {
            element.set_active(state);
            element.trObj.style.zIndex = 1;
        });
    }
    add_new_trigger(tr)
    {
        this.new_triggers.push(tr)
    }
    add_old_trigger(tr)
    {
        this.old_triggers.push(tr)
    }
    add_new_panel(p)
    {
        this.new_panels.push(p)
    }
    add_old_panel(p)
    {
        this.old_panels.push(p)
    }
    set_new_panels(opacity)
    {
        this.new_panels.forEach(element => {
            element.style.opacity = opacity;
        });
    }
    set_old_panels(opacity)
    {
        this.old_panels.forEach(element => {
            element.style.opacity = opacity;
        });
    }
    action()
    {
        console.log("Trigger "+ this.id+ " triggered")
        if (this.active)
        {
            this.set_active(false)
            this.trObj.style.zIndex = -1;
            this.set_old_triggers(false)
            this.set_new_triggers(true)
            this.set_new_panels("100%")
            this.set_old_panels("0%")
        }
    }
}

function getElem(name)
{
    return(document.getElementById(name));
}

function all_true(list)
{
    let out = true
    list.forEach(element => {
        out = out && element
    });
    return (out)
}

function set_opacity_tr(thisTr, next_trigger, opacity_lvl, nb_clicks, panel_id)
{
        opacity_lvl = 0;
        thisTr.set_active(true);
        thisTr.action =  function()
        {
            if (thisTr.active)
            {
                if (opacity_lvl < 100)
                {
                    opacity_lvl += 100/nb_clicks;
                    getElem(panel_id).style.opacity = opacity_lvl.toString() + "%"
                }
                if (opacity_lvl >= 100)
                {
                    thisTr.set_active(false)
                    next_trigger.set_active(true)
                }
            }
        }
}

function set_image_sequence_tr(thisTr, next_trigger, imgLst, nbImg, index)
{
        index = 1
        thisTr.action =  function()
        {
            if (thisTr.active)
            {
                if (index < nbImg)
                {
                    getElem(imgLst[index]).style.opacity = "100%"
                    if (index > 0)
                        getElem(imgLst[index -1]).style.opacity = "0%"
                    index += 1
                }
                if (index >= nbImg)
                {
                    thisTr.set_active(false)
                    next_trigger.set_active(true)
                }
            }
        }
}

function save_adventure(adventureName)
    {
        console.log("Saving adventure")
        var canvas = document.createElement('canvas');
        canvas.width = 2613;
        canvas.height = 7596;
        let context =  canvas.getContext("2d");
        bg = getElem("BG")
        context.drawImage(getElem("BG"),0,0)
        context.drawImage(getElem("theCube"),0,0)
        context.drawImage(getElem("theSquares"), 0,0)
        let docImages = getElem(adventureName).childNodes;
        docImages.forEach(element => {
            if (element.id != undefined)
            {
                if(element.style.opacity > 0)
                {
                    posx =  ((element.offsetLeft - bg.offsetLeft)/bg.clientWidth)*canvas.width
                    posy =  ((element.offsetTop - bg.offsetTop)/bg.clientHeight)*canvas.height
                    context.drawImage(element, posx, posy)
                }
            }
        });
        var url = canvas.toDataURL('image/png');
        window.open(url)
    }

function reset_adventure(adv_id)
{
    let container = getElem("adventure" + adv_id.toString())
    var images = container.getElementsByTagName("img");
    for(var i=0; i<images.length; i++) {
        images[i].style.opacity = 0;
    }
    getElem("theSquares").style.opacity = "0%"
    cubeTr.set_active(true)
}

function dragElement(elmnt, parent, moving_img_url) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var old_url = elmnt.src;
    var top_percent;
    var left_percent;
    if (document.getElementById(elmnt.id + "_header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "_header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function fit_in_area()
    {
        elmnt.style.marginTop = (parent.offsetTop + top_percent*parent.clientHeight) + "px";
        elmnt.style.marginLeft = (parent.offsetLeft + left_percent*parent.clientWidth) + "px";
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      window.addEventListener("resize", function(){
        fit_in_area()
        });
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elmnt.src = moving_img_url;

      posTop = Math.max(parent.offsetTop,(elmnt.offsetTop - pos2));
      posLeft = Math.max(parent.offsetLeft,(elmnt.offsetLeft - pos1));

      posTop = Math.min(posTop, parent.offsetTop + parent.clientHeight - elmnt.clientHeight);
      posLeft = Math.min(posLeft, parent.offsetLeft + parent.clientWidth - elmnt.clientWidth);

      // set the element's new position:
      elmnt.style.marginTop = posTop + "px";
      elmnt.style.marginLeft =  posLeft + "px";

      top_percent = (posTop - parent.offsetTop)/parent.clientHeight;
      left_percent = (posLeft - parent.offsetLeft)/parent.clientWidth;
    }

    function closeDragElement() {
        elmnt.src = old_url;
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
