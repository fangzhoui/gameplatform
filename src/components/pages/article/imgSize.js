(function(){
	var img = document.getElementsByTagName('img');
    for(var i = 0; i < img.length; i++){
      img[i].style.marginBottom = '10px';
      img[i].style.marginTop = '10px';
      getImgNaturalDimensions(img[i], function(TW){
        var TWidth = TW;
        var NWidth = !!img[i].width ? img[i].width : TWidth;
        var a = parseInt(NWidth/TWidth * 100);
        if(a > 100){
          a = 100;
        }
        img[i].style.width = a + '%';
      });
  	}
	function getImgNaturalDimensions(img, callback) {
      var nWidth, nHeight;
      var image = new Image();
      image.src = img.src;
      image.onload = function(){
        nWidth = img.naturalWidth
        nHeight = img.naturalHeight
        callback(nWidth)
      }
    }
})()