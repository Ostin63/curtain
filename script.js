const x = document.getElementsByClassName("img-comp-overlay");

for (let i = 0; i < x.length; i++) {
 
  compareImages(x[i]);   /*получить ширину и высоту элемента img*/
}
function compareImages(img) {
  
  var curtain, img, clicked = 0, w, h;
  
  w = img.offsetWidth;
  h = img.offsetHeight;
  
  img.style.width = (w / 2) + "px"; /*установите ширину элемента img на 50%:*/
  
  curtain = document.createElement("DIV"); /*создать слайдер:*/
  curtain.setAttribute("class", "img-comp-slider");
  
  img.parentElement.insertBefore(curtain, img);  /*вставить слайдер*/
  
  curtain.style.top = (h / 2) - (curtain.offsetHeight / 2) + "px"; /*поместите ползунок посередине:*/
  curtain.style.left = (w / 2) - (curtain.offsetWidth / 2) + "px";
  
  curtain.addEventListener("mousedown", slideReady);  /*выполнять функцию при нажатии кнопки мыши:*/
  
  window.addEventListener("mouseup", slideFinish); /*и еще одна функция при отпускании кнопки мыши:*/
  
  curtain.addEventListener("touchstart", slideReady); /*или прикоснулся (для сенсорных экранов:*/
  
  window.addEventListener("touchstop", slideFinish);

  function slideReady(e) {
    
    e.preventDefault(); /*предотвратить любые другие действия, которые могут произойти при перемещении по изображению:*/
    
    clicked = 1;  /*ползунок теперь нажат и готов к перемещению:*/
    
    window.addEventListener("mousemove", slideMove);
    window.addEventListener("touchmove", slideMove);
  }

  function slideFinish() {

    clicked = 0;   /*ползунок больше не нажимается:*/
  }

  function slideMove(e) {
    var pos;
    
    if (clicked == 0) return false;   /*если ползунок больше не нажимается, выйдите из этой функции:*/
    
    pos = getCursorPos(e); /*получить позицию курсора по x:*/

    if (pos < 0) pos = 0; /*предотвратить положение слайдера за пределами изображения:*/
    if (pos > w) pos = w;
    
    slide(pos);  /*выполнить функцию, которая изменит размер наложенного изображения в соответствии с курсором:*/
  }

  function getCursorPos(e) {
    var a, x = 0;
    e = e || window.event;
    
    a = img.getBoundingClientRect();  /*получить x позиции изображения:*/
    
    x = e.pageX - a.left;   /*вычислить координату x курсора относительно изображения:*/
    
    x = x - window.pageXOffset;  /*рассмотрите любую прокрутку страницы:*/

    return x;
  }

  function slide(x) {
    
    img.style.width = x + "px";  /*изменить размер изображения:*/
    
    curtain.style.left = img.offsetWidth - (curtain.offsetWidth / 2) + "px";   /*установите ползунок:*/
  }
}