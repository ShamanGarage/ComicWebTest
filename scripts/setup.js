let upperUX = getElem("upperUX")
let facetoUX = getElem("facetoUX")
let sideBar = getElem("sideBar")
let barDot = getElem("navDot")
let bar = getElem("bar")

function adjust_elements()
{
    document.body.style.marginTop = upperUX.clientHeight.toString() + "px"
    document.body.style.marginLeft = facetoUX.clientWidth.toString() + "px"
    sideBar.style.top = upperUX.clientHeight.toString() + "px"
    sideBar.style.width = facetoUX.clientWidth.toString() + "px"
}
window.onload = function()
{
    adjust_elements()
}
window.onresize = function()
{
    this.adjust_elements()
}



window.onscroll = function()
{
    var scrollPosition = window.pageYOffset;
    var windowSize     = window.innerHeight;
    var bodyHeight     = getElem("BG").offsetHeight + upperUX.clientHeight;

    let percent = Math.max(scrollPosition/(bodyHeight - windowSize), 0)
    percent = Math.min(1, percent)
    barDot.style.top = ((bar.clientHeight -(bar.clientHeight * 0.15)) * percent).toString() + "px"
}
