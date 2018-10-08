window.onload = function() {
  new Search()
  new Register()
  new UnameGet()
  new GetLocaInfo()
}

var Register = function() {
  this.box = $('.registerBox')
  this.btn = $('.registerbtn');
  this.yzm = $('.yzm')
  this.password = $('[name=password]');
  this.yzmBox = $('.yzmBox')
  this.email = $('[name=email]');
  this.list = $('.email-list');
  this.span = $('.email-list span');
  this.flag = {
    "unameFlag": false,
    "passwordFlag": false,
    "repasswordFlag": false,
    "phoneFlag": false,
    "emailFlag": false,
    "yzmFlag": false
  }
  this.init()
}
$.extend(Register.prototype, {
  init: function() {
    this.boxClick()
    this.yzmCheck()
    this.yzmChiose()
    this.flagCheck()
  },
  boxClick: function() {
    this.box.on('focusin', function(e) {
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
    this.patten = this.zhengze()

    this.target.on('input', function() {
      if (this.patten) {
        this.classToggle()
        if (this.theName == 'email') {
          this.emailCent()
          this.list.fadeIn(300)
        }
      }
    }.bind(this))
    this.target.on('blur', function() {
      if (this.theName == 'emailBQ') {
        this.email.val(this.target.text())
        this.target.val(this.target.text())
      }
      this.classToggle()
      this.list.fadeOut(300)
    }.bind(this))

  },
  classToggle: function() {
    if (this.patten.test(this.target.val())) {
      if (this.theName == 'emailBQ') {
        $('.emailErr').hide(0);
        this.email.removeClass('inpErr flagView')
        this.flag.emailFlag = true
      } else {
        this.theErr.hide(0);
        this.target.removeClass('inpErr flagView')
        this.flag[this.theName + "Flag"] = true
      }
    } else {
      if (this.theName == 'emailBQ') {
        $('.emailErr').show(0);
        this.email.addClass('inpErr')
        this.flag[this.theName + "Flag"] = false
      } else {
        this.theErr.show(0);
        if (this.target.is('input')) {
          this.target.addClass('inpErr')
        }
        this.flag[this.theName + "Flag"] = false
      }

    }
  },
  zhengze: function() {
    var patten = null;
    switch (this.theName) {
      case "uname":
        return patten = /^[A-Za-z][A-Za-z0-9]{3,9}$/;
        break;
      case "password":
        return patten = /^[A-Za-z0-9]{6,20}$/;
        break;
      case "repassword":
        return patten = eval("/^" + this.password.val() + "$/");
        break;
      case "phone":
        return patten = /^1[3,5,8]\d{9}$/;
        break;
      case "email":
      case "emailBQ":
        return patten = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        break;
    }
  },
  emailCent: function() {
    if (this.target.val().indexOf('@') == -1) {
      this.span.text(this.target.val())
    } else {
      this.span.text(this.target.val().substring(0, this.target.val().indexOf('@')))
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
        $('.yzm_text').text('验证成功').css('color', '#fff')
        this.flag.yzmFlag = true
      }
    }.bind(this))
  },
  flagCheck: function() {
    this.btn.on('click', function() {
      this.bigFlag = true
      for (var item in this.flag) {
        if (!this.flag[item]) {
          this.bigFlag = false
          var x = item.substring(0, item.length - 4);
          if (x != 'yzm') {
            $('[name=' + x + ']').focus().addClass('flagView')
          }
          $('.' + x + 'Err').show(0)
          break;
        }
      }
      if (this.bigFlag) {
        $.ajax({
          url: "php/register.php",
          type:"post",
          data: {
            uname: $('[name=uname]').val(),
            pwd: this.password.val(),
            phone: $('[name=phone]').val(),
            email: this.email.val()
          },
          success: function(res) {
            if (res == '1') {
              alert('注册成功')
              location.href = "index.html"
            }else if (res == 2) {
              alert('该用户名已被使用')
            }else {
              alert('注册失败')
            }
          }
        })
      }
    }.bind(this))
  }
})
