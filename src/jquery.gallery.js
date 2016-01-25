/**
 * jquery.gallery.js v0.1.0
 * MIT License
 * author info pls visit: http://luopq.com
 * for more info pls visit: https://github.com/LuoPQ/jquery.gallery.js
 */
; (function ($, window, document, undefined) {

    var defaults = {
        thumMoveStep: 5,             //一次移动的数量
        moveSpeed: 300,              //移动的速度
        fadeSpeed: 300,              //淡入淡出的速度
        selectClass: null,
        imageIndex: 0,
        bigImg: ".bigImg",
        prevImg: ".prevImg",
        nextImg: ".nextImg",
        thumbList: ".thumbList",
        prevPage: ".prevPage",
        nextPage: ".nextPage",
        onImgChanged: null
    }

    function Gallery($ele, opt) {
        opt = this.opt = $.extend(defaults, opt);

        this.$ele = $ele;
        this.$bigImg = $ele.find(opt.bigImg);
        this.$thumbList = $ele.find(opt.thumbList);
        this.$thumItems = this.$thumbList.children();

        this.$nextBtn = $ele.find(opt.nextImg);
        this.$prevBtn = $ele.find(opt.prevImg);
        this.$nextPageBtn = $ele.find(opt.nextPage);
        this.$prevPageBtn = $ele.find(opt.prevPage);

        this.itemCount = this.$thumItems.length;
        this.imageIndex = opt.imageIndex;
        this.pageIndex = 0;
        this.pageCount = Math.ceil(this.itemCount / opt.thumMoveStep);

        this.init();
    }
    Gallery.prototype = {
        constructor: Gallery,
        init: function () {
            this.wrapDom();
            this.bindEvent();
            this.changeImg();
        },
        wrapDom: function () {
            this.$thumbList.css({
                "position": "relative",
                "width": this.$thumItems.outerWidth(true) * this.itemCount,
            });

            this.$bigImg.wrap("<div style='width:" + this.$bigImg.width() + "px;height:" + this.$bigImg.height() + "px;margin:0 auto;'></div>");
        },
        bindEvent: function () {
            var that = this;

            that.$thumItems.on('click', function (e) {
                e.preventDefault();
                that.imageIndex = $(this).index();
                that.changeImg();
            });
            that.$nextBtn.on('click', function () {
                if (that.imageIndex < that.itemCount - 1) {
                    that.imageIndex++;
                    that.changeImg();
                    that.pageIndex = Math.floor(that.imageIndex / that.opt.thumMoveStep);
                    that.moveThum();
                }
            });
            that.$prevBtn.on('click', function () {
                if (that.imageIndex > 0) {
                    that.imageIndex--;
                    that.changeImg();
                    that.pageIndex = Math.floor(that.imageIndex / that.opt.thumMoveStep);
                    that.moveThum();
                }
            });
            that.$nextPageBtn.on('click', function () {
                if (that.pageIndex < that.pageCount - 1) {
                    that.pageIndex++;
                    that.moveThum();
                }
            });
            that.$prevPageBtn.on('click', function () {
                if (that.pageIndex > 0) {
                    that.pageIndex--;
                    that.moveThum();
                }
            });

            that.$bigImg.on({
                "mousemove": function (event) {
                    var x = event.offsetX || (event.clientX - that.$bigImg.offset().left);

                    if (x < (that.$bigImg.width() / 2)) {
                        //$imgWin.css("cursor", "pointer");
                    }
                    else {
                        //$imgWin.css("cursor", "move");
                    }
                },
                "mouseout": function () {
                    //$imgWin.css("cursor", "auto");
                },
                "click": function (event) {
                    var x = event.offsetX || (event.clientX - that.$bigImg.offset().left);

                    if (x < (that.$bigImg.width() / 2)) {
                        that.$prevBtn.trigger("click");
                    }
                    else {
                        that.$nextBtn.trigger("click");
                    }
                }
            })
            $(document).on("keydown", function (event) {
                var code = event.keyCode || event.which;
                switch (code) {
                    case 37:
                        that.$prevBtn.trigger("click");
                        break;
                    case 39:
                        that.$nextBtn.trigger("click");
                        break;
                    default:

                }
            })
        },
        changeImg: function () {
            //获取原图并设置到大图位置
            var $thum = this.$thumItems.eq(this.imageIndex);

            $thum.addClass(this.opt.selectClass).siblings().removeClass(this.opt.selectClass);
            this.$bigImg.hide().attr('src', $thum.find('a').attr('href')).fadeIn(this.opt.fadeSpeed);
            this.setVisibleBtn();

            this.opt.onImgChanged && this.opt.onImgChanged.call($thum, this.imageIndex);
        },
        moveThum: function () {
            var pos = (this.$thumItems.outerWidth(true) * this.opt.thumMoveStep) * this.pageIndex
            this.$thumbList.animate({ 'left': -pos }, this.opt.moveSpeed);

            this.setVisibleBtn();
        },
        setVisibleBtn: function () {
            this.$prevPageBtn.show();
            this.$nextPageBtn.show();
            this.$prevBtn.show();
            this.$nextBtn.show();

            if (this.pageIndex === 0) {
                this.$prevPageBtn.hide();
            }
            if (this.pageIndex === this.pageCount - 1) {
                this.$nextPageBtn.hide();
            }
            if (this.imageIndex === 0) {
                this.$prevBtn.hide();
            }
            if (this.imageIndex === this.itemCount - 1) {
                this.$nextBtn.hide();
            }
        }
    }

    $.fn.gallery = function (options) {


        return this.each(function () {
            return new Gallery($(this), options);
        });
    }
})(jQuery, window, document);