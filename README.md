## alert
一款小体积（自动适配手机和pc浏览器，集成了css，页面只需引入一个5kb左右的js单文件）的jQuery(Zepto)弹窗插件，可自己修改CSS定制自己的弹窗皮肤

[在线演示](https://ydq.github.io/alert)，可自定义皮肤。

---

### 使用方法

页面按顺序先引入jQuery（或ZeptoJS），然后再引入alert的js即可

```html
<script type="text/javascript" src="jquery.min.js"></script>
<!-- <script type="text/javascript" src="zepto.min.js"></script> -->
<script type="text/javascript" src="alert.min.js"></script>
```
### 使用demo

```javascript
$.alert('消息弹窗')
$.alert('消息弹窗',function(){
  //点击确定之后执行的回调函数
  //return false 可以阻止对话框关闭
  //this 指向弹窗对象
})

$.confirm('消息弹窗')
$.confirm('消息弹窗',function(e){
  //点击确定或取消后的回调函数，点击确定e = true，点击取消e = false
  //return false 可以阻止对话框关闭
  //this 指向弹窗对象
}).ok('同意').cancel('不同意')//支持修改弹窗的按钮文字

$.tips('弹出一条2秒后自动消失的悬浮提示');
$.tips('自定义关闭时间',5000);//仅限PC浏览器支持，手机浏览器设置后无任何效果

$.load('加载中提示');
$.load();   //支持默认的提示语句
$.loaded(); //加载完成后调用
```

### 插件API

| 方法      | 参数       | 参数说明                                   | 方法说明                      |
| ------- | -------- | -------------------------------------- | ------------------------- |
| alert   | string   | 必须，弹窗消息                                | 弹出一个只有确定按钮的对话框            |
|         | function | 可选，回调函数，点击确定后执行                        | return false 可阻止对话框关闭     |
| confirm | string   | 必须，弹窗消息                                | 弹出一个有确定和取消两个按钮的对话框        |
|         | function | 可选，回调函数，点击按钮后执行，并根据点击的按钮传入true和false参数 | return false 可阻止对话框关闭     |
| tips    | string   | 必须，消息提示内容                              | 弹出一个会自动消失的信息提示框           |
|         | int      | 可选，自动消失的时间，针对PC浏览器有效，若不设置默认为2秒         |                           |
| load    | string   | 可选，消息的内容                               | 弹出一个没有按钮的全屏遮罩消息，可用于加载中等提示 |
| loaded  | 无        | 无                                      | 关闭load对话框                 |

#### 说明：
- *`confirm`的回调函数默认有一个参数，参数值为`boolean`，当点击`确定`时参数为`ture`，当点击`取消`时参数为`false`*
- *`alert`和`confirm`的回调函数如果`return false`，则可以`阻止对话框关闭`，在某些情况下比较有用*
- *不管是`alert`、`confirm`还是`tips`，参数中的`msg`都`必须设置`，否则没有任何效果*
- *`alert`和`confirm`中的回调函数中的`this`对象指向当前对话框对象，例如在回调函数中使用：`this.content('这样可以直接修改对话框中间的内容')`，再配合`return false`可以自己做更丰富的消息展示*



### 插件方法

```javascript
var dialog = $.alert('下面方法API中的dialog对象是这么获得的')
$.confirm('回调中的this也是dialog对象',function(e){
  //这里的this也是dialog对象
  e||this.content('这样可以改变中间的内容')
  return e;
})
var loading = $.load('数据努力加载中...');
loading.close();//或者使用$.loaded();来关闭load弹出的消息
```

| 方法                             | 参数     | 说明              |
| ------------------------------ | ------ | --------------- |
| dialog.content(str)            | string | 参数必须，修改对话框对象的内容 |
| dialog.ok(str)                 | string | 参数必须，修改确定按钮的文本  |
| dialog.cancel(str)             | string | 参数必须，修改取消按钮的文本  |
| dialog.close() | 无      | 关闭并销毁对话框        |

### 弹窗出现后的Dom结构如下：
#### alert和confirm的弹窗结构
```html
<div class="alert_overlay alert_show pc/mob"><!-- 根据PC和手机浏览器自动添加一个pc或mob的class -->
  <div class="alert_msg">
    <div class="alert_content">你的内容，可以是HTML</div>
    <div class="alert_buttons">
      <button class="alert_btn alert_btn_ok">确定</button>
      <button class="alert_btn alert_btn_cancel">取消</button><!-- alert没有此button -->
    </div>
  </div>
</div>
```
#### pc版本tips结构(允许多次弹窗，自动堆叠)
```html
<div class="alert_tips pc">
  <div>tips1</div>
  <div>tips2</div>
  <div>tips3</div>
  <div>tips4</div>
</div>
```
#### mob版本tips结构(不允许多次弹窗，新弹窗会覆盖之前的弹窗)
```html
<div class="alert_tips mob">
  <div>tips</div>
</div>
```

### CSS说明

-   `alert_overlay`  背景遮罩，其中PC浏览器会多一个`.pc`的class，手机浏览器会多一个`.mob`的class
-   `alert_show`  用于alert、confirm、load显示和关闭的css动画控制
-   `alert_msg` 消息框主体
-   `alert_content` 内容容器
-   `alert_buttons` 底部按钮容器
-   `alert_btn` 两个按钮公用class
-   `alert_btn_ok` 确定按钮
-   `alert_btn_cancel` 取消按钮
-   `alert_tips` tips容器，其中PC浏览器会多一个`.pc`的class，手机浏览器会多一个`.mob`的class
-   `alert_tips div` tips消息体



### 兼容性

- 兼容`IE10+`，`Android2+`，`iOS3+`
- 兼容`Zepto1.1+`、`jQuery`

### 版权

原创插件，随意复制随意修改随意传播，可不保留我的信息