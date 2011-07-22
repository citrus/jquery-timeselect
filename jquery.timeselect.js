// jquery.timeselect.js
// copyright Spencer Steffen
// https://github.com/citrus/jquery-timeselect

(function($) {

  var version = '0.1.0';
  
  $.fn.timeselect = function() {
    return this.each(function() {
    
      var self = $(this);
      var container, buttons, minutes, minute_left, ampm, time = [];
      self.focus(focus).blur(blur);
      
      return this;
            
      function focus() {
        if (!container) {
          build_display();
        }
        container.show();
      }
      
      function blur() {
        container.hide();
      }
      
      function mouseover(evt) {
        var a = $(this);
        a.siblings('a').removeClass('selected');
        var left = a.addClass('selected').position().left;
        set(a.text(), this.rel);
        if (this.rel == 'hour') {
          minute_left = left;
          adjust_left(minutes, left);
          adjust_left(ampm, minute_left);
        }
        if (this.rel == 'minute') {
          adjust_left(ampm, minute_left + left);
        }
      }
      
      function click(evt) {
        evt.preventDefault();
        self.focus();
      }
      
      function set(value, type) {
        var index = type == "hour" ? 0 : type == "minute" ? 1 : 2;
        value += type == "hour" ? ":" : type == "minute" ? " " : "";
        time[index] = value;
        self.val(time.join(""));
      }
      
      function adjust_left(div, left) {
        div.css('left', left);
      }
      
      function build_button(text, type) {
        return '<a href="#' + text + '" class="' + type + '" rel="' + type + '">' + text + '</a>';
      }
      
      function build_display() {
        var div = document.createElement('div');
        var mins = ['00', 15, 30, 45];
        var i, tags = [];
        for(i = 1; i <= 12; i++) {
          tags.push(build_button(i, 'hour'));
        }
        tags.push('<br style="clear: left;"/><span class="minutes">');
        for(i = 0; i < mins.length; i++) {
          tags.push(build_button(mins[i], 'minute'));
        }
        tags.push('</span><br style="clear: left;"/><span class="ampm">');
        tags.push(build_button('am', 'ampm'));
        tags.push(build_button('pm', 'ampm'));
        tags.push('</span><br style="clear: left;"/>');
        div.innerHTML = tags.join("");
        div.className = "time-select";
        container = $(div).appendTo(self.parent());
        minutes = container.find('span.minutes').css({
          'position': 'absolute',
          'top': 25
        });
        ampm = container.find('span.ampm').css({
          'position': 'absolute',
          'top': 50
        });
        buttons = container.find('a').mouseover(mouseover).click(click);
      }
      
    });
  };
    
})(jQuery);
