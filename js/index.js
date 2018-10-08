window.onload = function() {
  new Banner()
  new Search()
  new Login()
  new UnameGet()
  new GetLocaInfo()
}

var Banner = function() {
  this.btn = $("#banner>.iconfont");
  this.lbtn = $("#leftbtn")
  this.rbtn = $("#rightbtn");
  this.banner = $(".bannerH");
  this.timer = null;
  this.list = $('.bannerlist')
  this.span = $(".bannerlist a span");
  this.index = 0;
  this.init()
}

$.extend(Banner.prototype, {
  init: function() {
    this.span.eq(this.index).stop(true, true).animate({
      'width': 40
    }, 2000)
    this.autoplay()
    this.btnhide()
    this.btnClick()
    this.listClick()
  },
  autoplay: function() {
    this.timer = setInterval(function() {
      this.index++
        if (this.index == 3) {
          this.index = 0
        }
      this.imgplay()
      this.btnplay()
    }.bind(this), 2000);
  },
  imgplay: function() {
    this.banner.stop(true, true).fadeTo(500, 0)
    this.banner.eq(this.index).stop(true, true).fadeTo(1000, 1)
  },
  btnplay: function() {
    this.span.stop(true, true).animate({
      'width': 0
    }, 0)
    this.span.eq(this.index).stop(true, true).animate({
      'width': 40
    }, 2000)
  },
  btnhide: function() {
    this.btn.on('mouseover', function(event) {
      event.preventDefault();
      var target = $(event.target)
      target.stop(true, true).fadeTo(300, 1)
    })
    this.btn.on('mouseout', function(event) {
      event.preventDefault();
      var target = $(event.target)
      target.stop(true, true).fadeTo(300, 0.2)
    })
  },
  btnClick: function() {
    this.btn.on('click', function(event) {
      event.preventDefault();
      clearInterval(this.timer)
      clearTimeout(this.timer2)
      var target = $(event.target)
      var btnid = target.attr('id');
      if (btnid == 'leftbtn') {
        this.index--;
        if (this.index == -1) {
          this.index = 2
        }
        this.imgplay()
        this.span.stop(true, true).animate({
          'width': 0
        }, 0)
        this.span.eq(this.index).stop(true, true).animate({
          'width': 40
        }, 5000)
      }
      if (btnid == 'rightbtn') {
        this.index++;
        if (this.index == 3) {
          this.index = 0
        }
        this.imgplay()
        this.span.stop(true, true).animate({
          'width': 0
        }, 0)
        this.span.eq(this.index).stop(true, true).animate({
          'width': 40
        }, 5000)
      }
      this.timeOut()
    }.bind(this))
  },
  timeOut: function() {
    this.timer2 = setTimeout(function() {
      this.autoplay()
    }.bind(this), 3000);
  },
  listClick: function() {
    this.list.on('click', function(event) {
      clearInterval(this.timer)
      clearTimeout(this.timer2)
      if (event.target.nodeName == "A" || event.target.nodeName == 'I') {
        this.index = $(event.target).index();
        if (event.target.nodeName == 'I') {
          this.index = $(event.target).parent().index();
        }
        this.imgplay()
        this.span.stop(true, true).animate({
          'width': 0
        }, 0)
        this.span.eq(this.index).stop(true, true).animate({
          'width': 40
        }, 5000)
        this.timeOut()
      }
    }.bind(this))
  }
})
