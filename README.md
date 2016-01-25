# jquery.gallery.js
基于jQuery的轻量级图片浏览插件

1、轻量级的图片浏览插件，支持简单的动画效果
2、不提高UI，只提供简单的接口，完全由开发人员自定义UI
3、支持设置默认的图片索引
4、支持图片改变后的回调
5、支持键盘操作切换图片

### 基本使用
#### html
```
<div class="gallery">
    <img class="big" src="images/view1.jpg" />
    <a href="javascript:;" class="prev btnPrev">上一个</a>
    <a href="javascript:;" class="next btnNext">下一个</a>
    <div class="thumb-box">
        <ul class="thumb-list">
            <li class="active">
                <a href="images/view1.jpg">
                    <img src="images/view1.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view2.jpg">
                    <img src="images/view2.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view3.jpg">
                    <img src="images/view3.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view4.jpg">
                    <img src="images/view4.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view5.jpg">
                    <img src="images/view5.jpg" />
                </a>

            </li>
            <li>
                <a href="images/view6.jpg">
                    <img src="images/view6.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view7.jpg">
                    <img src="images/view7.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view8.jpg">
                    <img src="images/view8.jpg" />
                </a>
            </li>
            <li>
                <a href="images/view9.jpg">
                    <img src="images/view9.jpg" />
                </a>
            </li>                
        </ul>
    </div>
    <a href="javascript:;" class="prev-page prevPage">向前</a>
    <a href="javascript:;" class="next-page nextPage">往后</a>
</div>
```
注意，缩略图的原图地址放在a标签的href属性中，比如
```
<li>
    <a href="images/view9.jpg">
        <img src="images/view9.jpg" />
    </a>
</li>   
```
a标签的href数量放的是原图地址，img的src放的是缩略图地址。

#### CSS
```
html, body, div, img { margin: 0; padding: 0; }
a { text-decoration: none; }
ul { list-style-type: none; }
.gallery { margin: 50px auto; position: relative; width: 600px; text-align: center; }
.prev { position: absolute; left: 0; top: 40%; }
.next { position: absolute; right: 0; top: 40%; }
.thumb-box { height: 104px; margin: 0 auto; position: relative; overflow: hidden; }
.thumb-list { height: 80px; }
    .thumb-list li { margin: 0 3px; float: left; padding: 3px 0; }
    .thumb-list img { height: 80px; width: 120px; display: block; }
    .thumb-list .active { border: 3px solid #b6ff00; padding: 0; }
.prev-page { }
.next-page { }
```
注意：这里的CSS只做演示之用，并不适合使用到项目中

#### Script
```
<script src="http://luopq.com/demo/lib/jquery-1.10.2.min.js"></script>
<script src="../src/jquery.gallery.js"></script>
<script>
    $(".gallery").gallery({
        bigImg: ".big",
        prevImg: ".btnPrev",
        nextImg: ".btnNext",
        thumbBox: ".thumb-box",
        thumbList: ".thumb-list",
        prevPage: ".prevPage",
        nextPage: ".nextPage",
        selectClass: "active",
    });
</script>
```

### Demo
1、<a href="http://luopq.com/demo/gallery/examples/index.html" target="_blank">Demo</a>

#### options
|参数名|类型|默认值|描述|
|-----|----|-----|---|
|thumMoveStep|number|5|缩略图移动一次的数量|
|moveSpeed|number|300(ms)|缩略图移动的时间|
|fadeSpeed|number|300(ms_|图片切换淡入淡出的时间|
|selectClass|string|null|缩略图被选中的样式|
|imageIndex|number|0|当前浏览的图片的索引|
|bigImg|string|".bigImg"|当前浏览的大图标签的选择器|
|prevImg|string|".prevImg"|前一张图片按钮的选择器|
|nextImg|string|".nextImg"|后一张图片按钮的选择器|
|thumbList|string|".thumbList"|缩略图列表的选择器|
|prevPage|string|".prevPage"|缩略图列表向前按钮的选择器|
|nextPage|string|".nextPage"|缩略图列表向后按钮的选择器|
|onImgChanged|function|null|图片切换后的回调函数|