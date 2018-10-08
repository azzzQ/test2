window.onload = function() {
  new Login()
  new Search()
  new NavToggle()
  new ChoiseCard()
  new Safe()
  new Pjadd()
  new BuyCar()
  new UnameGet()
  PriceTest()
  new GetLocaInfo()
}

var NavToggle = function() {
  this.nav = $('.nav')
  this.topTip = $('.topTip')
  this.picShow = $('.product-left')
  this.init()
}
$.extend(NavToggle.prototype, {
  init: function() {
    this.navScroll()
    this.takeAll()
  },
  takeAll: function() {
    this.navHide()
    this.topTipChange()
    this.picShowToggle()
  },
  navScroll: function() {
    $(document).scroll(function() {
      this.takeAll()
    }.bind(this))
  },
  navHide: function() {
    if ($(document).scrollTop() > 0) {
      this.nav.hide(0)
    } else {
      this.nav.show(0)
    }
  },
  topTipChange: function() {
    if ($(document).scrollTop() > 0) {
      this.topTip.css({
        'position': 'fixed',
        'z-index': 100
      })
    } else {
      this.topTip.css({
        'position': 'absolute',
        'z-index': 1
      })
    }
  },
  picShowToggle: function() {
    if ($(document).scrollTop() > 1218) {
      this.picShow.css({
        'position': "absolute",
        'top': 1418
      })
    } else {
      this.picShow.css({
        'position': 'fixed',
        'top': 200
      })
    }
  }
})

var ChoiseCard = function() {
  this.list = $('.choise-list li')
  this.bigPrice = $('.bigPrice span')
  this.pic = $('.product-left img')
  this.init();
}
$.extend(ChoiseCard.prototype, {
  init: function() {
    this.listClick()
  },
  listClick: function() {
    var _that = this
    this.list.on('click', function() {
      _that.target = $(this);
      _that.btnChange();
      _that.picShow();
      _that.price = $(this).find('.price').html()
    })
  },
  btnChange: function() {
    this.list.removeClass('checked').find('a').removeClass('check');
    this.target.find('a').addClass('check');
    this.target.addClass('checked')
    this.index = this.target.attr('index')
  },
  picShow: function() {
    if (this.index == 1) {
      this.pic.attr('src', 'img/product/pro_show1.png')
    } else if (this.index == 2 || this.index == 3) {
      this.pic.attr('src', 'img/product/pro_show2.jpg')
    } else if (this.index == 4 || this.index == 5) {
      this.pic.attr('src', 'img/product/pro_show3.jpg')
    } else {
      this.pic.attr('src', 'img/product/pro_show4.jpg')
    }
  }
})

var Safe = function() {
  this.safeBox = $('.secure-choise .choiseBox')
  this.init()
}
$.extend(Safe.prototype, {
  init: function() {
    this.boxClick()
  },
  boxClick: function() {
    var _that = this
    this.safeBox.on('click', function() {
      _that.target = $(event.target);
      if (_that.target.hasClass('uncheck')) {
        _that.target.toggleClass('check')
        $(this).toggleClass('checked')
      } else {
        $(this).find('.save-box').slideToggle(300)
        $(this).find('.icon-icon-arrow-left2').toggleClass('icon-onclick')
      }
    })
  }
})

var Pjadd = function() {
  this.box = $('.peijian-list .choiseBox')
  this.init()
}
$.extend(Pjadd.prototype, {
  init: function() {
    this.boxClick()
  },
  boxClick: function() {
    var _that = this;
    this.box.on('click', function() {
      _that.target = $(event.target);
      if (_that.target.hasClass('pj-add')) {
        $(this).find('.add').toggle()
        $(this).toggleClass('checked')
        _that.target.hide(0).siblings().show(0)
      }
    })
  }
})

var BuyCar = function() {
  this.btn = $('.buycarBTN');
  this.init()
}
$.extend(BuyCar.prototype, {
  init: function() {
    this.findChecked()
  },
  findChecked: function() {
    var pro_info = {};
    this.btn.on('click', function() {
      this.newinfo = [];
      this.checked = $(".checked")
      for (var i = 0; i < this.checked.length; i++) {
        if ($(this.checked[i]).attr("pid")) {
          var pro_info = {
            "pid": $(this.checked[i]).attr("pid"),
            "count": 1
          }
          if ($(this.checked[i]).attr("pid").indexOf('p') != -1) {
            var pro_info = {
              "pid": $(this.checked[i]).attr("pid"),
              "count": 1,
              "b":null,
              "binfo":[]
            }
            for (var i = 0; i < $('.secure-choise .checked').length; i++) {
              pro_info.binfo.push($($('.secure-choise .checked')[i]).attr('bid'))
            }
            if ($('.secure-choise .checked').length == 2) {
              pro_info.b = 2
            }else if ($('.secure-choise .checked').length == 1) {
              pro_info.b = $('.secure-choise .checked').index()
            }
          }
          this.newinfo.push(pro_info)
        }
      }
      this.getUsername()
    }.bind(this))
  },
  getUsername: function() {
    this.locaName = 'goods'
    if ($.cookie('uname')) {
      this.locaName = $.cookie('uname')+"goods"
      this.oldinfo = JSON.parse(localStorage.getItem($.cookie('uname')+'goods'));
      this.goodsNumber()
    } else{
      this.oldinfo = JSON.parse(localStorage.getItem("goods"));
      this.goodsNumber()
    }
  },
  goodsNumber:function () {

    if (localStorage.getItem(this.locaName, this.newinfo)) {

      for (var i = 0; i < this.newinfo.length; i++) {
        this.flag = true
        for (var j = 0; j < this.oldinfo.length; j++) {

          if (this.oldinfo[j].pid == this.newinfo[i].pid) {

            if (this.newinfo[i].pid.indexOf('p') != -1) {
              if (this.oldinfo[j].b == this.newinfo[i].b) {
                this.oldinfo[j].count++
                this.flag = false
              }
            }else {
              this.oldinfo[j].count++
              this.flag = false
            }
          }
        }
        if (this.flag) {
          this.oldinfo.push(this.newinfo[i])

        }
      }
    }else {
      this.oldinfo = this.newinfo
    }
    this.addGoods()
  },
  addGoods:function () {
    this.newinfo = JSON.stringify(this.oldinfo)
    localStorage.setItem(this.locaName,this.newinfo)
    new GetLocaInfo()
    // location.href = 'shoppingCar.html'
  }
})


var PriceTest = function() {
  $(document).on('click', function() {
    var sum = 0
    for (var i = 0; i < $('.checked').find('.price').length; i++) {
      sum = sum + parseFloat($($('.checked').find('.price')[i]).html().match(/\d+/)[0]);
    }
    $('.bigPrice span').html(sum)
  })
}
