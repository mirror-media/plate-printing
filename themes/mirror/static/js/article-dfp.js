/*
 * initialize the DFP AD divisions
 * gotta load adunits.js in advance for reference
 */
$(function(){
  var sectionId = $('meta[name="section-id"]').attr('content');
  var categoryId = $('meta[name="category-id"]').attr('content');
  var constructAdDiv = function(posObj, pos){
    var adCloseBtn = (pos !== 'MBCVR')? '' : '<div class="ad-close"><div class="ad-close-btn"><span class="close-btn"><canvas>關閉</canvas></span></div></div>'
    return '<div class="' + posObj['cont-class'].join(' ') + '" style="' + posObj['cont-style'].join(';') + '">'
          + '<div class="' + posObj['class'].join(' ')
          + '" pos="' + pos + '" id="' + posObj['aduid']
          + '" data-dimensions="' + posObj['dimensions']
          + '" data-size-mapping="' + posObj['sitemapping']
          + '" style="' + posObj['style'].join(';')  + '"></div>'
          + adCloseBtn
          + '</div>';
  };
  if ( sectionId ) {
    if( !ADUNITS['exception-categ'][categoryId] ){
      for( var pos in ADUNITS[sectionId] ){
        var _div = ( pos !== 'MBCVR' )? '' : '<div class="mb-ad-cover tb-ad-cover computer-hide" style="display: none;"><div class="mb-ad-modal tb-ad-modal"></div>';
        _div += constructAdDiv(ADUNITS[sectionId][pos], pos);
        _div += ( pos !== 'MBCVR' )? '' : '</div>';
        $( 'div[ad-pos="' + pos + '"]').replaceWith(_div);
      }
    }else if(ADUNITS['exception-categ'][categoryId] ){
      for(var pos in ADUNITS['exception-categ'][categoryId]){
        var _div = ( pos !== 'MBCVR' )? '' : '<div class="mb-ad-cover tb-ad-cover computer-hide" style="display: none;"><div class="mb-ad-modal tb-ad-modal"></div>';
        _div += constructAdDiv(ADUNITS['exception-categ'][categoryId][pos], pos);
        _div += ( pos !== 'MBCVR' )? '' : '</div>';
        $( 'div[ad-pos="' + pos + '"]').replaceWith(_div);
      }
      $('.close-btn').click(function(){
        $('.mb-ad-cover').hide();
      });
    }

    var DFPId = $('meta[name="DFPIP"]').attr('content');
    $.dfp({
        'dfpID': DFPId,
        'enableSingleRequest': true,
        'collapseEmptyDivs': true,
        'setCentering': true,
        'sizeMapping': SIZE_MAPPING,
        'afterEachAdLoaded': function(adunit){
          if( $(adunit['selector']).attr('pos') === 'MBCVR' ){
            console.log('MBCVR height', $(adunit['selector']).find('div:nth(0)').find('iframe:nth(0)').height());
            if( $(adunit['selector']).find('div:nth(0)').find('iframe:nth(0)').height() > 100 ){
              if(!Cookies.get('visited')){
                $('.mb-ad-cover').show();
                DrawCloseBtn.getCloseBtn('.close-btn canvas');
                Cookies.set('visited', 'true', { expires: 600 });
              }
            }
          }
        }
    });
  }
});
var DrawCloseBtn = (function(){
  var _drawCloseBtn = function(canvasTarget){
    var _canvas = document.querySelector(canvasTarget);
    if ( _canvas && _canvas.getContext) {
      _canvas.setAttribute('width', _canvas.parentNode.clientWidth);
      _canvas.setAttribute('height', _canvas.parentNode.clientHeight);
      var cxt = _canvas.getContext('2d');
      cxt.fillStyle = 'rgba(0, 0, 0, 1)';
      cxt.shadowOffsetX = 1;
      cxt.shadowOffsetY = 1;
      cxt.shadowBlur = 2;
      cxt.shadowColor = 'rgba(0, 0, 0, 0.5)';

      var _basicRedius = _canvas.width/2;

      cxt.arc(_basicRedius, _basicRedius, _basicRedius * 0.9, 0, 2*Math.PI, true);
      cxt.fill();
      cxt.closePath();

      cxt.beginPath();
      cxt.fillStyle = 'rgba(255, 255, 255, 1)';
      cxt.arc(_basicRedius, _basicRedius, _basicRedius * 0.75, 0, 2*Math.PI, true);
      cxt.fill();
      cxt.closePath();

      cxt.beginPath();
      cxt.fillStyle = 'rgba(0, 0, 0, 1)';
      cxt.arc(_basicRedius, _basicRedius, _basicRedius * 0.6, 0, 2*Math.PI, true);
      cxt.fill();
      cxt.closePath();

      cxt.lineWidth = 3;
      cxt.strokeStyle = 'rgba(255, 255, 255, 1)';
      cxt.shadowOffsetX = 0;
      cxt.shadowOffsetY = 0;
      cxt.shadowBlur = 0;

      cxt.beginPath();
      cxt.moveTo(_basicRedius - (_basicRedius * 0.3), _basicRedius + (_basicRedius * 0.3));
      cxt.lineTo(_basicRedius + (_basicRedius * 0.3), _basicRedius - (_basicRedius * 0.3));
      cxt.closePath();
      cxt.stroke();

      cxt.beginPath();
      cxt.moveTo(_basicRedius + (_basicRedius * 0.3), _basicRedius + (_basicRedius * 0.3));
      cxt.lineTo(_basicRedius - (_basicRedius * 0.3), _basicRedius - (_basicRedius * 0.3));
      cxt.closePath();
      cxt.stroke();
    }
  };
  return {
    'getCloseBtn': function(canvasTarget){
      _drawCloseBtn(canvasTarget);
    }
  };
})();
