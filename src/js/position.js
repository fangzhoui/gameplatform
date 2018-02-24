export function scrolltop (part){
  var scrolltop = document.body.scrollTop;
  return sessionStorage.setItem(part, scrolltop);
}
export function position(part){
  if (!!sessionStorage.getItem(part) && sessionStorage.getItem(part) != '') {
   return document.body.scrollTop = JSON.parse(sessionStorage.getItem(part));
  } else {
   return document.body.scrollTop = 0;
  }
}
