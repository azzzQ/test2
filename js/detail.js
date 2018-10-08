window.onload = function() {
  new TopChange()
  new Search()
  new Login()
  new UnameGet()
  new ToProduct()
}

var TopChange = function() {
  this.ul = $('.bblist');
  this.icon = $('.bb_icon');
  this.init()
}
$.extend(TopChange.prototype, {
  init: function() {
    this.scrollChange()
  },
  scrollChange: function() {
    $(document).scroll(function () {
      if ($(document).scrollTop() > 30) {
        this.ul.css({
          'position':'fixed',
          'top':0,
          'left':0,
          'right':0,
          'z-index':30
        }).addClass('shadow').animate({'height':0,},400);
        this.icon.slideUp(300)
      }
      if ($(document).scrollTop() < 5) {
        this.ul.css({
          'position':'relative',
          'height':93,
          'z-index':2
        }).removeClass('shadow').finish().animate({'height':93},0);;
        this.icon.slideDown(200);
      }
    }.bind(this))
  }
})

var ToProduct = function () {
  this.li = $('.product-info li');

  this.init()
}
$.extend(ToProduct.prototype,{
  init:function () {
    this.liClick()
  },
  liClick:function () {
    var _that = this
    this.li.on('click',function () {
      location.href = 'productAll.html#pid='+$(this).attr('pid')
    })
  }
})
