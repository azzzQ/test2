
var getRandom = function(min, max) {
  return Math.floor((Math.random() * (max - min) + 1) + min);
}

var stopPropa = function(e) {
  var e = e || event;
  if (e.stopPropagation) {
    return e.stopPropagation();
  } else {
    return e.cancelBubble = true;
  };
}

function stopDefault(e) {
  var e = e || event;
  if (e.preventDefault) {
    return e.preventDefault()
  } else {
    return e.returnValue = false;
  }
}

function addEvent(ele, eve, callback) {
  if (ele.addEventListener) {
    ele.addEventListener(eve, callback);
  } else {
    ele.attachEvent("on" + eve, callback);
  }
}

var $ = function(cName, tag) {
  var x = cName.split('');
  var y = cName.substr(1);
  var arr = [];
  if (x[0] == '#') {
    return document.getElementById(y);
  } else if (x[0] == '.') {
    var z = document.getElementsByTagName(tag);
    for (var i = 0; i < z.length; i++) {
      if (z[i].className == y) {
        arr.push(z[i]);
      }
    }
    return arr;
  } else {
    return document.getElementsByTagName(cName);
  }
}

var animate = function(obj, target, fn) {
  // 防止重复开始计时器
  clearInterval(obj.timer)
  obj.timer = setInterval(function() {
    // 测试条件是否达到 // 每执行一次计时器，重置一次 flag
    var flag = true;
    // 初始化样式数据
    var current = 0;
    //	遍历 object 里的 键值
    // 创造一个 名为 arrt 的变量，承接 object 的键值
    for (var arrt in target) {
      //  获取样式数字部分
      if (arrt == 'opacity') {
        current = parseFloat(arrtGet(obj, arrt)) * 100
      } else {
        current = parseInt(arrtGet(obj, arrt));
      }
      var speed = (target[arrt] - current) / 10;
      //  当 speed 大于 0 时，向上取整
      //  当 speed 小于 0 时, 向下取整
      if (speed > 0) {
        speed = Math.ceil(speed)
      } else {
        speed = Math.floor(speed)
      }
      //  当样式数据到达目标时，停止计时器
      if (current != target[arrt]) {
        flag = false;
      }
      //  style 的值，每次增加
      if (arrt == 'opacity') {
        obj.style[arrt] = (current + speed) / 100
      } else if (arrt == 'zIndex') {
        obj.style[arrt] = obj[arrt];
      } else {
        obj.style[arrt] = current + speed + 'px'
      }
      //  当所有条件满足后，停止计时器
      if (flag) {
        clearInterval(obj.timer)
        if (fn) {
          fn();
        }
      }
      // 如果有函数参数，执行函数参数
    }
  }, 20);
}

var arrtGet = function(obj, arrt) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(obj, null)[arrt];
  } else {
    return obj.currentStyle[arrt];
  }
}
