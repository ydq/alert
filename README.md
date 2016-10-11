##alert
一款超小体积（自动适配手机和pc浏览器，集成了css，页面只需引入一个<5kb的js单文件）的jQuery(Zepto)弹窗插件，可自己修改CSS定制自己的弹窗皮肤

[在线演示](http://alert.code.10176523.cn)，可自定义皮肤。

---

###使用方法

页面按顺序先引入jQuery（或ZeptoJS），然后再引入alert的js即可，无需引入css（最新版本已集成至js文件中）

```html
<script type="text/javascript" src="jquery.min.js"></script>
<!-- 	<script type="text/javascript" src="zepto.min.js"></script> -->
<script type="text/javascript" src="alert.min.js"></script>
```
###使用demo

```javascript
$.alert('消息弹窗')
$.alert('消息弹窗',function(){
  //点击确定之后执行的回调函数
})
$.confirm('消息弹窗')
$.confirm('消息弹窗',function(e){
  //点击确定或取消后的回调函数，点击确定e = true，点击取消e = false
})
$.tips('弹出一条2秒后自动消失的悬浮提示');
$.tips('弹出一条5秒后自动消失的悬浮提示，仅限PC浏览器有效',5000);
```

###插件API

| 方法      | 参数       | 参数说明                                   | 方法说明               |
| ------- | -------- | -------------------------------------- | ------------------ |
| alert   | msg      | 必须，弹窗消息                                | 弹出一个只有确定按钮的对话框     |
|         | function | 可选，回调函数，点击确定后执行                        |                    |
| confirm | msg      | 必须，弹窗消息                                | 弹出一个有确定和取消两个按钮的对话框 |
|         | function | 可选，回调函数，点击按钮后执行，并根据点击的按钮传入true和false参数 |                    |
| tips    | msg      | 必须，消息提示内容                              | 弹出一个会自动消失的信息提示框    |
|         | times    | 可选，自动消失的时间，针对PC浏览器有效，若不设置默认为2秒         |                    |



###弹窗出现后的Dom结构如下：
####alert和confirm的弹窗结构
```html
<div class="alert_overlay pc/mob"><!-- 根据PC和手机浏览器自动添加一个pc或mob的class -->
  <div class="alert_msg">
    <div class="alert_content">你的内容，可以是HTML</div>
    <div class="alert_buttons">
      <button class="alert_btn alert_btn_ok">确定</button>
      <button class="alert_btn alert_btn_cancel">取消</button><!-- alert没有此button -->
    </div>
  </div>
</div>
```
####pc版本tips结构(允许多次弹窗，自动堆叠)
```html
<div class="alert_tips pc">
  <div>tips1</div>
  <div>tips2</div>
  <div>tips3</div>
  <div>tips4</div>
</div>
```
####mob版本tips结构(不允许多次弹窗，新弹窗会覆盖之前的弹窗)
```html
<div class="alert_tips mob">
  <div>tips</div>
</div>
```

###CSS说明

`alert_overlay`  背景遮罩，其中PC浏览器会多一个`.pc`的class，手机浏览器会多一个`.mob`的class
`alert_msg` 消息框主体
`alert_content` 内容容器
`alert_buttons` 底部按钮容器
`alert_btn` 两个按钮公用class
`alert_btn_ok` 确定按钮
`alert_btn_cancel` 取消按钮
`alert_tips` tips容器，其中PC浏览器会多一个`.pc`的class，手机浏览器会多一个`.mob`的class
`alert_tips div` tips消息体



###兼容性

- 兼容现代浏览器和现代手机，旧版本的浏览器请自行测试，部分浏览器可能js本身是支持的，只是css可能不太兼容，如需兼容这类浏览器请自行修改css
- 兼容Zepto1.1+、jQuery

### 版权

原创插件，随意复制随意修改随意传播，可不保留我的信息