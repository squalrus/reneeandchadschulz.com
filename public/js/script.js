var v = document.getElementById( 'video' )
    ,vRatio = 960 / 641;

function resizeVideo() {
    var wHeight = window.innerHeight
        ,wWidth = window.innerWidth
        ,wRatio = wWidth / wHeight
        ,vWidth
        ,vHeight;

    if( vRatio <= wRatio ){
        vHeight = wHeight - 120;
        vWidth = vHeight * vRatio;

        v.width = vWidth;
        v.height = vHeight;
        v.style.left = ( wWidth - vWidth ) / 2 + 'px';
    } else {
        vWidth = wWidth - 40;
        vHeight = vWidth * ( 1 / vRatio );

        v.width = vWidth;
        v.height = vHeight;
        v.style.left = 20 + 'px';
    }

    // Update positioning
    v.style.position = 'absolute';
    v.style.top = 100 + 'px';
    v.style.zIndex = 9999;
}

window.addEventListener( 'resize', function( event ){
    resizeVideo();
});

resizeVideo();