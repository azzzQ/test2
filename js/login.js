window.onload = function () {
  new Login()
  new Search()
  new Tologin()
  new UnameGet()
  new GetLocaInfo()
}

var Tologin = function () {
  this.loginBox = $('.loginBox');
  this.btn = $('.loginbtn');
  this.yzm = $('.yzm')
  this.yzmBox = $('.yzmBox');
  this.flag = {
    'unameFlag':false,
    'passwordFlag':false,
    'yzmFlag':false
  }
  this.init()
}

$.extend(Tologin.prototype,{
  init : function () {
    this.boxClick();
    this.yzmChiose()
    this.yzmCheck()
    this.flagCheck()
  },
  boxClick:function () {
    this.loginBox.on('focusin',function () {
      var e = e || event;
      this.target = $(event.target);
      this.theName = this.target.attr('name');
      if (this.theName) {
        this.inpErr()
      }
    }.bind(this))
  },
  inpErr: function() {
    this.theErr = $("." + this.theName + 'Err')
    this.target.on('input', function() {
        this.classToggle()
    }.bind(this))
      this.target.on('blur', function() {
        this.classToggle()
      }.bind(this))

  },
  classToggle: function() {
    if (!this.target.val() == '') {
        this.theErr.hide(0);
        this.target.removeClass('inpErr flagView')
        this.flag[this.theName + "Flag"]= true
      } else {
        this.theErr.show(0);
        if (this.target.is('input')) {
          this.target.addClass('inpErr')
        }
        this.flag[this.theName + "Flag"] = false
    }
  },
  yzmChiose: function() {
    this.yzmBox.on('selectstart', function() {
      return false;
    })
  },
  yzmCheck: function() {
    this.kuai = $('.kuai');
    this.greenbg = $('.greenbg');
    this.yzmZhuai()

  },
  yzmZhuai: function() {
    this.kuai.on('mousedown', function(e) {
      event.preventDefault()
      var e = e || event
      this.kuaiX = e.offsetX;
      $(document).on('mousemove', function(e) {
        var e = e || event
        this.yzmX = e.pageX - this.yzm.offset().left - this.kuaiX
        if (this.yzmX <= 0) {
          this.kuai.css({
            "left": 0
          })
        } else {
          this.kuai.css({
            "left": this.yzmX
          })
          if (this.yzmX > this.yzm.innerWidth() - this.kuai.width()) {
            this.kuai.css({
              "left": this.yzm.innerWidth() - this.kuai.width()
            })
          }
        }
        this.greenbg.css({
          'width': this.kuai.position().left
        })
      }.bind(this))
      this.yzmUp()
    }.bind(this))
  },
  yzmUp: function() {
    $(document).on('mouseup', function() {
      $(document).unbind('mousemove');
      if (this.yzmX < this.yzm.innerWidth() - this.kuai.width()) {
        this.kuai.stop(true).animate({
          'left': 0
        }, 300)
        this.greenbg.stop(true).animate({
          'width': 0
        }, 300)
      } else {
        $(document).unbind();
        this.kuai.unbind();
        $('.yzmErr').hide(0);
        $('.yzm_text').text('验证成功').css('color','#fff')
        this.flag.yzmFlag = true
      }
    }.bind(this))
  },
  flagCheck:function () {
    this.btn.on('click',function () {
      this.bigFlag = true
      for (var item in this.flag) {
        if (!this.flag[item]) {
          this.bigFlag = false
          var x = item.substring(0,item.length-4);
          if (x != 'yzm') {
            $('[name='+x+']').focus().addClass('flagView')
          }
          $('.'+x+'Err').show(0)
          break;
        }
      }
      if (this.bigFlag) {
        $.ajax({
          url: "php/login.php",
          data: {
            uname: $('[name=uname]').val(),
            pwd: $('[name=password]').val(),
          },
          success: function(res) {
            if (res == 1) {
              alert('登录成功')
              $.cookie('uname',$('[name=uname]').val())
              if (!localStorage.getItem($.cookie('uname')+'goods')) {
                var x = []
                x = JSON.stringify(x)
                localStorage.setItem($.cookie('uname')+'goods',x)
              }
              location.href = "index.html"
            }else if (res == 2) {
              alert('用户名不存在')
            }else {
              alert('密码错误')
            }
          }
        })
      }
    }.bind(this))
  }
})
