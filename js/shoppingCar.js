window.onload = function() {
  new Search()
  new Login()
  new GetAjax()
  new UnameGet()
  new GetLocaInfo()
}

var updateInfo = function(info) {
  var newinfo = JSON.stringify(info)
  if ($.cookie('uname')) {
    localStorage.setItem($.cookie('uname') + 'goods', newinfo)
  } else {
    localStorage.setItem('goods', newinfo)
  }
}

var sumPrice = function() {
  var sum = 0
  var proSum = 0
  for (var i = 0; i < $('.checked').length; i++) {
    sum = sum + parseFloat($($('.checked')[i]).find('.lastPrice').html())
    proSum = proSum + parseFloat($($('.checked')[i]).find('input').val())
  }
  $('.allPrice span').html(sum)
  $('.checkNum').html($('.checked .lastPrice').length)
  $('.allNum').html(proSum)
}


var GetAjax = function() {
  this.uname = $.cookie('uname');

  this.init()
}
$.extend(GetAjax.prototype, {
  init: function() {
    this.getAjax()
  },
  getAjax: function() {
    var _that = this
    $.ajax({
      type: 'get',
      url: "js/info.json",
      success: function(res) {
        _that.res = res
        _that.prolist = [];
        _that.baolist = []

        for (var i = 0; i < res.length; i++) {

          if (res[i].pid) {
            _that.prolist.push(res[i])
          } else {
            _that.baolist.push(res[i])
          }
        }
        _that.info = getInfo()

        new GetLoca(_that)
        new infoChange(_that)
        new DeleAllPro()
      }
    })
  }
})

var Chushi = function() {
  this.proBox = $('.proBox')
  this.uncheck = $('.uncheck')
  this.init()
}
$.extend(Chushi.prototype, {
  init: function() {
    this.addCheck()
  },
  addCheck: function() {
    this.proBox.addClass('checked')
    this.uncheck.addClass('check')
  }
})

var GetLoca = function(res) {
  this.uname = res.uname
  this.res = res.prolist
  this.bao = res.baolist,
  this.info = res.info
  this.ul = $('.goodslist')

  this.init()
}

$.extend(GetLoca.prototype, {
  init: function() {
    this.writeInfo()
  },
  writeInfo: function() {
    var t = '';
    var b = '';
    for (var i = 0; i < this.info.length; i++) {
      for (var j = 0; j < this.res.length; j++) {
        if (this.res[j].pid == this.info[i].pid) {
          if (this.info[i].b != null) {
            b = this.writebao(this.info[i].binfo)
            t = t +
              `
              <li class='proBox' pid=${this.info[i].pid}>
                <ul>
                  <li class='pro-img'><span class='uncheck ib fl'></span><div class='fl'><a class='ib toWeb' href="${this.res[j].toHref}"><img src='${this.res[j].imgSrc[0]}' style='width:100px;'><span  class='pro-naem'>${this.res[j].pname}</span></a></div><div b=${this.info[i].b} class='bao fr'>${b[0]}</div></li>
                  <li class='price'>${parseInt(this.res[j].price) + parseInt(b[1])}</li>
                  <li class='count'><p style='margin:auto'><span class="ib sub" style='border-right:1px solid #000'>-</span><input type="text" name="" value="${this.info[i].count}"><span style='border-left:1px solid #000' class="ib add">+</span></p></li>
                  <li class='lastPrice'>${(parseInt(this.res[j].price) + parseInt(b[1])) * this.info[i].count}</li>
                  <li><a href='javascrip:void(0)' class='dele ib iconfont icon-x'></a></li>
                </ul>
              </li>`

          } else {
            t = t +
              `
          <li  class='proBox' pid=${this.info[i].pid}>
            <ul>
              <li class='pro-img'><span class='uncheck ib fl'></span><div class='fl'><a class='ib toWeb' href="${this.res[j].toHref}"><img src='${this.res[j].imgSrc[0]}' style='width:100px;'><span  class='pro-naem'>${this.res[j].pname}</span></a></div><div class='bao fr'></div></li>
              <li class='price'>${this.res[j].price}</li>
              <li class='count'><p style='margin:auto'><span class="ib sub" style='border-right:1px solid #000'>-</span><input type="text" name="" value="${this.info[i].count}"><span style='border-left:1px solid #000' class="ib add">+</span></p></li>
              <li class='lastPrice'>${parseInt(this.res[j].price) * this.info[i].count}</li>
              <li><a href='javascrip:void(0)' class='dele ib iconfont icon-x'></a></li>
            </ul>
          </li>`
          }
        }
      }
    }

    this.ul.html(t)
    new Chushi()
    sumPrice()

  },
  writebao: function(arr) {
    var t = ''
    var sum = 0
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < this.bao.length; j++) {
        if (arr[i] == this.bao[j].bid) {
          t = t + `<b class = 'b-name'>${this.bao[j].pname} </b> ￥<b class='b-price'>${this.bao[j].price}</b><br>`
          sum = sum + parseFloat(this.bao[j].price)
        }
      }
    }
    var arr = [t, sum]
    return arr;
  }
})

var infoChange = function(res) {
  this.proBox = $('.proBox')
  this.deleAllBtn = $('.deleAll')
  this.res = res.prolist
  this.bao = res.baolist

  this.init()
}
$.extend(infoChange.prototype, {
  init: function() {
    this.boxClick()
    this.DeleAll()
    this.btnTEST()
  },
  btnTEST: function() {
    $('.toWeb').on('click', function(e) {
      location.href = $(this).attr('href')
    })
  },
  boxClick: function() {
    var _that = this
    this.proBox.on('click', function() {

      _that.info = getInfo()

      _that.target = $(event.target)
      _that.bigTarget = $(this)

      _that.pid = _that.bigTarget.attr('pid')
      _that.b = _that.bigTarget.find('.bao').attr('b')

      _that.locaChange()

      if (_that.target.hasClass('uncheck')) {
        _that.boxChiose()
        _that.ifCheckAll()
      }
      if (_that.target.hasClass('dele')) {
        _that.boxDele()
        new GetLocaInfo().infoShow(_that.res, _that.bao)
      }
      if (_that.target.hasClass('add')) {
        _that.boxAdd()
        new GetLocaInfo().infoShow(_that.res, _that.bao)
      }
      if (_that.target.hasClass('sub')) {
        _that.boxSub()
        new GetLocaInfo().infoShow(_that.res, _that.bao)
      }
      if (_that.target.is('input')) {
        _that.countChange()
        new GetLocaInfo().infoShow(_that.res, _that.bao)
      }
      return false;
    })
  },
  ifCheckAll:function () {
    for (var i = 0; i < $('.goodslist .uncheck').length; i++) {
      if (!$($('.goodslist .uncheck')[i]).hasClass('check')) {
        $('.pay .uncheck').removeClass('check')
        break;
      }else {
        $('.pay .uncheck').addClass('check')
      }
    }
  },
  boxChiose: function() {
    this.target.toggleClass('check')
    this.bigTarget.toggleClass('checked')
    $('.checkNum').html($('.checked').length)
    sumPrice()
  },
  boxAdd: function() {
    var t = this.bigTarget.find('input').val()
    t++
    this.bigTarget.find('input').val(t)
    this.bigTarget.find('.lastPrice').html(t * this.bigTarget.find(".price").html())
    this.info[this.i].count = parseInt(this.bigTarget.find('input').val())
    updateInfo(this.info)
    sumPrice()
  },
  boxSub: function() {
    var t = this.bigTarget.find('input').val()
    t--
    if (t < 1) {
      t = 1
    }
    this.bigTarget.find('input').val(t)
    this.bigTarget.find('.lastPrice').html(t * this.bigTarget.find(".price").html())
    this.info[this.i].count = parseInt(this.bigTarget.find('input').val())
    updateInfo(this.info)
    sumPrice()
  },
  boxDele: function() {
    this.bigTarget.remove()
    this.info.splice(this.i, 1)
    updateInfo(this.info)
    sumPrice()
  },
  locaChange: function() {
    for (var i = 0; i < this.info.length; i++) {
      if (this.info[i].pid == this.pid && this.b == this.info[i].b) {
        this.i = i
      }
    }
  },
  DeleAll: function() {
    this.deleAllBtn.on('click', function() {
      for (var i = 0; i < $('.checked').length; i++) {
        for (var j = 0; j < this.info.length; j++) {
          if (this.info[j].pid == $($('.checked')[i]).attr('pid') && $($('.checked')[i]).find('.bao').attr('b') == this.info[j].b) {
            this.info.splice(j, 1)
          }
        }
      }
      $('.checked').remove()
      updateInfo(this.info)
      sumPrice()
      new GetLocaInfo().infoShow(_that.res, _that.bao)
    }.bind(this))
  },
  countChange: function() {
    this.target.on('input', function() {
      this.info[this.i].count = parseInt(this.target.val())
      if (!isNaN(parseInt(this.target.val()))) {
        this.bigTarget.find('.lastPrice').html(parseInt(this.target.val()) * this.bigTarget.find(".price").html())
        updateInfo(this.info)
        sumPrice()
        new GetLocaInfo().infoShow(_that.res, _that.bao)
      }
    }.bind(this))
  }
})

var DeleAllPro = function() {
  this.btn = $('.checkPro .uncheck')
  this.proBox = $('.proBox')

  this.init()
}
$.extend(DeleAllPro.prototype, {
  init: function() {
    this.btnClick()
  },
  btnClick: function() {
    this.btn.on('click', function() {
      if (this.btn.hasClass('check')) {
        this.btn.removeClass('check')
        for (var i = 0; i < this.proBox.length; i++) {
          $(this.proBox[i]).removeClass('checked')
          $(this.proBox[i]).find('.uncheck').removeClass('check')
        }
      } else {
        for (var i = 0; i < this.proBox.length; i++) {
          this.btn.addClass('check')
          if (!$(this.proBox[i]).hasClass('checked')) {
            $(this.proBox[i]).addClass('checked')
            $(this.proBox[i]).find('.uncheck').addClass('check')
          }
        }
      }
      sumPrice()
    }.bind(this))
  }
})
