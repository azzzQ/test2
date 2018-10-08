window.onload = function() {
  new Search();
  new Login();
  new Getinfo();
  new UnameGet()
  new GetLocaInfo()
}

var Getinfo = function() {
  this.infoCode = location.href.split('#')[1].split('=')[1];

  this.init();
}
$.extend(Getinfo.prototype, {
  init: function() {
    this.GetAjax()
  },
  GetAjax: function() {
    var _that = this
    $.ajax({
      type: 'get',
      url: "js/info.json",
      success: function(res) {
        for (var i = 0; i < res.length; i++) {
          if (res[i].pid == _that.infoCode) {
            _that.res = res[i]
          }
        }
        _that.writeWeb()
        _that.writeSmallPic()
        new PicChange(_that.res)
        new TobuyCar(_that)
        new GoodsCount()
      }
    })
  },
  writeWeb: function() {
    $('.pro-name').html(this.res.pname);
    $('.price').html(this.res.price);
    $('.bigPic img').attr('src', this.res.imgSrc[0]);
  },
  writeSmallPic: function() {
    var t = ''
    for (var i = 0; i < this.res.imgSrc.length; i++) {
      if (i == 0) {
        t = `<li class="fz0"><a href="javascrip:void(0)" class="ib look"><img src="${this.res.imgSrc[i]}" alt=""></a></li>`
      } else {
        t = t + `<li class="fz0"><a href="javascrip:void(0)" class="ib"><img src="${this.res.imgSrc[i]}" alt=""></a></li>`
      }
    }
    $('.shopPicList').html(t)
  }
})

var PicChange = function(res) {
  this.lbtn = $('.leftbtn');
  this.rbtn = $('.rightbtn');
  this.li = $('.shopPicList li')
  this.img = $('.bigPic img')
  this.index = 0
  this.src = res.imgSrc
  this.length = res.imgSrc.length

  this.init()
}
$.extend(PicChange.prototype, {
  init: function() {
    this.btnClick()
    this.ulClick()
  },
  btnClick: function() {
    this.lbtn.on('click', function() {
      if (this.index == 0) {
        this.index = this.length - 1
      } else {
        this.index--
      }
      this.smallPicChange()
    }.bind(this))
    this.rbtn.on('click', function() {
      if (this.index == this.length - 1) {
        this.index = 0
      } else {
        this.index++
      }
      this.smallPicChange()
    }.bind(this))
  },
  smallPicChange: function() {
    this.img.stop(true, true).fadeTo(300, 0);
    this.img.attr('src', this.src[this.index]).stop(true, true).fadeTo(300, 1);
    this.li.find('a').removeClass('look')
    this.li.eq(this.index).find('a').addClass('look')
  },
  ulClick: function() {
    var _that = this
    this.li.on('click', function() {
      _that.index = $(this).index()
      _that.smallPicChange()
    })
  }
})

var GoodsCount = function () {
  this.inp = $('.count input')
  this.add = $('.count .add')
  this.sub = $('.count .sub')
  this.span = $('.count span')
  this.price = $('.price').html()

  this.init()
}
$.extend(GoodsCount.prototype,{
  init:function () {
    this.addAndSub()
  },
  addAndSub:function () {
    this.span.on("click",function () {
      this.target = $(event.target)
      this.goodsNub = this.inp.val()
      this.addBtn()
      this.inp.val(this.goodsNub)
      $('.price').html(this.price * this.goodsNub +".00")
    }.bind(this))
  },
  addBtn:function () {
    if (this.target.hasClass("add")) {
      this.goodsNub++
    }
    if (this.target.hasClass("sub")) {
      this.goodsNub--
      if (this.goodsNub == -1) {
        this.goodsNub=0
      }
    }
  }
})

var TobuyCar = function(res) {
  this.btn = $('.buyNow')
  this.inp = $('.count input')
  this.infoCode = {
    "pid": res.infoCode,
    "count":parseInt(this.inp.val())
  }
  console.log(this.infoCode);

  this.init()
}
$.extend(TobuyCar.prototype, {
  init: function() {
    this.btnClick()
  },
  btnClick:function () {
    this.btn.on('click',function () {
      this.infoCode.count = this.inp.val()
      this.getUsername()
    }.bind(this))
  },
  getUsername: function() {
    this.locaName = "goods"
    if ($.cookie('uname')) {
      this.locaName = $.cookie('uname')+"goods"
      this.oldinfo = JSON.parse(localStorage.getItem($.cookie('uname')+'goods'));
      this.goodsNumber()
    }else{
      this.oldinfo = JSON.parse(localStorage.getItem("goods"));
      this.goodsNumber()
    }
  },
  goodsNumber:function () {
    if (localStorage.getItem(this.locaName,this.newinfo)) {
      this.flag = true
      for (var i = 0; i < this.oldinfo.length; i++) {
        if (this.oldinfo[i].pid == this.infoCode.pid) {
          this.oldinfo[i].count = parseInt(this.oldinfo[i].count) + parseInt(this.infoCode.count)
          this.flag =false
        }
      }
      if (this.flag) {
        this.oldinfo.push(this.infoCode)
      }
    }else {
      this.oldinfo.push(this.infoCode)
    }
    this.addGoods()
  },
  addGoods: function() {
    this.newinfo = JSON.stringify(this.oldinfo)
    localStorage.setItem(this.locaName,this.newinfo)
    location.href = 'shoppingCar.html'
  }
})
