
var Login = function() {
  this.loginbtn = $('#login_btn');
  this.loginClick()
}

$.extend(Login.prototype, {
  loginClick: function() {
    this.loginbtn.on('click', function() {
      location.href = 'register.html'
    }.bind(this))
  }
})

var Search = function() {
  this.sreach = $('#research')
  this.sreachbox = $('.search_Box')
  this.close = $('.searchclose')
  this.nav = $('#nav_list')
  this.oul = $('.search_list')
  this.inp = $('.search_Box input')
  this.init()
}

$.extend(Search.prototype, {
  init: function() {
    this.onClick()
  },
  onClick: function() {
    this.sreach.on('click', function() {
      this.nav.hide();
      this.sreachbox.fadeIn(500);
      this.oul.fadeIn(1000,function () {
        this.oulClick()
      }.bind(this));
    }.bind(this))
    this.close.on('click', function() {
      this.sreachbox.hide();
      this.oul.hide();
      this.nav.show();
    }.bind(this))
  },
  oulClick:function () {
    this.oul.on('click',function () {
      this.target = $(event.target);
      this.inp.val(this.target.text())
    }.bind(this))
  }
})

var UnameGet = function () {
  this.uname = $.cookie('uname')
  this.init()
}
$.extend(UnameGet.prototype,{
  init:function () {
    this.nameShow()
    // this.buybtnShow()
  },
  nameShow:function () {
    if (this.uname) {
      $('.loginbtn a').html(this.uname)
      $('.loginbtn a').attr('href','shoppingCar.html')
    }
  },
  // buybtnShow:function () {
  //   if (this.uname) {
  //     $('.buycarbtn').html('查看我的购物车')
  //   }
  // }
})

var GetLocaInfo = function () {
  this.init()

}
$.extend(GetLocaInfo.prototype,{
  init:function () {
    this.creatLoca()
    this.getAjax()
  },
  creatLoca:function () {
    if (!$.cookie('uname')) {
      if (!localStorage.getItem('goods')) {
        var x = [];
        x = JSON.stringify(x)
        localStorage.setItem('goods',x)
      }
    }

  },
  infoShow:function (prolist,baolist) {

    this.prolist = prolist
    this.baolist = baolist
    // console.log(this.prolist);
    this.info = getInfo()
    if (this.info.length != 0) {
      $('.buycarbtn ').html('查看我的购物车')
      $('.buycarbtn ').attr('href','shoppingCar.html')
      this.smallBuyCar()
    }
  },
  getAjax: function() {
    var _that = this
    $.ajax({
      type: 'get',
      url: "js/info.json",
      success: function(res) {
        _that.res = res
        var prolist = [];
        var baolist = []

        for (var i = 0; i < res.length; i++) {
          if (res[i].pid) {
            prolist.push(res[i])
          } else {
            baolist.push(res[i])
          }
        }

        _that.infoShow(prolist,baolist)
        // _that.infoDeleRepe()
      }
    })
  },
  smallBuyCar:function () {
    $('.bc-nopro').remove()
    $('.smallBuyCar').html('')
    var t = ''
    var b = ``
    for (var i = 0; i < this.info.length; i++) {
      for (var j = 0; j < this.prolist.length; j++) {
        if ($(this.info[i]).attr('pid')==this.prolist[j].pid) {
          if (this.info[i].b != null) {
            b = this.writebao(this.info[i].binfo)
            t = t+`<li>
            <a href="${this.prolist[j].toHref}" class="ib">
            <img class="fl" src="${this.prolist[j].imgSrc[0]}" alt="">
            <div class="fr">
            <p class="sc-proname">${this.prolist[j].pname}</p>
            <p class="sc-content><span class="sm-price fl">${this.prolist[j].price}</span><span class="sm-count fr">x${this.info[i].count}</span></p>
            <p class="sc-bao">${b[0]}</p>
            </div>
            </a>
            </li>`
          }else {

            t = t+`<li>
            <a href="${this.prolist[j].toHref}" class="ib">
            <img class="fl" src="${this.prolist[j].imgSrc[0]}" alt="">
            <div class="fr">
            <p class="sc-proname">${this.prolist[j].pname}</p>
            <p class="sc-content><span class="sm-price fl">${this.prolist[j].price}</span><span class="sm-count fr">x${this.info[i].count}</span></p>
            </div>
            </a>
            </li>`
          }
        }
      }
    }

    $('.smallBuyCar').html(t)
  },
  writebao: function(arr) {
    var t = ''
    var sum = 0
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < this.baolist.length; j++) {
        if (arr[i] == this.baolist[j].bid) {
          t = t + `<b class = 'b-name'>${this.baolist[j].pname} </b> ￥<b class='b-price'>${this.baolist[j].price}</b><br>`
          sum = sum + parseFloat(this.baolist[j].price)
        }
      }
    }
    var arr = [t, sum]
    return arr;
  }
})


var getInfo = function() {
  if ($.cookie('uname')) {
    var info = JSON.parse(localStorage.getItem($.cookie('uname') + 'goods'))
  } else {
    var info = JSON.parse(localStorage.getItem('goods'))
  }
  return info;
}
