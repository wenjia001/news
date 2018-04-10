let loadingBox = (function ($) {
    let $box = $(".loadingBox"),
        $range = $box.find(".run"),
        $text = $box.find(".text");
    let imgList = ["img/1.jpg","img/1.png","img/2.png","img/3.png","img/bg.jpg","img/contentBg.jpg","img/logo.png","img/pic.png","img/play.png"];
    let total = imgList.length,
        count = 0;
    let computed = function () {
        imgList.forEach((item)=>{
            let tempImg = new Image;
            tempImg.src = item;
            tempImg.onload = function () {
                tempImg = null;
                count++;
                run();
            }
        })
    };
    function run() {
        let num = parseInt(count/total*100)+'%';
        $range.css({"width":num});
        $text.text(num);
        if(count>=total){
            let timer = setTimeout(()=>{
                $box.remove();
                contentBox.init();
                clearTimeout(timer);
            },500)
        }
    }

    return{
        init:function () {
            $box.css("display","block");
            computed();
        }
    }
})(Zepto);
loadingBox.init();
let contentBox = (function ($) {
    let $galleryTop = $(".gallery-top"),
        $swiperSlide = $galleryTop.find(".swiper-slide"),
        $video = $(".video"),
        $mask = $(".mask"),
        $mainBox = $(".mainBox"),
        $content = $(".content");
    let videoList = ["movie/1.mkv","movie/2.mkv","movie/3.mkv"];
    $swiperSlide.each((index)=>{
        $swiperSlide.eq(index).click(()=>{
            if($swiperSlide.eq(index).hasClass('swiper-slide-active')){
                $mask.css("display","block");
                $mainBox.css("overflow","hidden");
                $video.attr('src',videoList[index]).css("display","block");
            }
        })
    });
    $mask.click(()=>{
        $mask.css("display","none");
        $mainBox.css("overflow","auto");
        $video.attr('src','').css("display","none");
    })
    
    function newSwiper(){
        var galleryTop = new Swiper('.gallery-top', {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    loop:true,
                    coverflow: {
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows : true
                    }
                });
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 0,
                centeredSlides: false,
                slidesPerView: 'auto',
                loop:true,
                noSwiping : true,
            });
            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;
    }
    return{
        init:function () {
            $content.css("display","block");
            newSwiper();
        }
    }
})(Zepto);