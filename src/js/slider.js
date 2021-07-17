function Slider(id, min, max) {
  this.canvas = document.getElementById(id);
  this.ctx = this.canvas.getContext('2d');

  this.gradient = this.ctx.createLinearGradient(250, 0, 0, 500);
  this.gradient.addColorStop(1, '#DCF3BB');
  this.gradient.addColorStop(0, '#758E50');

  window.addEventListener('load', _ => this.onLoad())
  document.addEventListener('mousemove', e => this.mouseMove(e));
  document.addEventListener('mousedown', e => this.mouseDown());
  document.addEventListener('mouseup', e => this.mouseUp());
  this.canvas.addEventListener('mouseout', e => this.mouseOut());
  this.canvas.addEventListener('mouseover', e => this.mouseOver());
}

Slider.prototype = Object.create(
  {
    constructor: Slider,
    degree2Radian: function (degrees) {
      return degrees * (Math.PI / 180);
    },

    onLoad: function () {
      this.canvas.width = 500;
      this.canvas.height = 500;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.centerX = this.width / 2;
      this.centerY = this.height / 2;
      this.mouseX = this.width / 2;
      this.mouseY = 0;
    },

    mouseMove: function (e) {
      if (this.isMouseOver && this.isMouseDown) {
        this.mouseX = e.offsetX;
        this.mouseY = e.offsetY;
      }
    },

    mouseDown: function () {
      this.isMouseDown = true;
    },

    mouseUp: function () {
      this.isMouseDown = false;
    },

    mouseOver: function () {
      this.isMouseOver = true;
    },

    mouseOut: function () {
      this.isMouseOver = false;
    },

    render: function () {
      const circleSize = 200;
      const thickness = 60;
      const draggingCircleSize = 32;

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const step = 360 / 24;

      this.ctx.fillStyle = 'black';

      const theta = Math.atan2(this.mouseY - this.centerY, this.mouseX - this.centerX);

      for (let i = 0; i < 360; i += step) {
        const x = Math.cos(this.degree2Radian(i)) * circleSize;
        const y = Math.sin(this.degree2Radian(i)) * circleSize;

        this.ctx.beginPath();
        this.ctx.fillStyle = 'black';
        this.ctx.arc(this.width / 2 + x, this.height / 2 + y, 10, 0, 2 * Math.PI);
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.arc(this.width / 2, this.height / 2, circleSize, this.degree2Radian(-90), theta);
        this.ctx.strokeStyle = this.gradient;
        this.ctx.lineWidth = thickness;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();

        const cx = Math.cos(theta) * circleSize;
        const cy = Math.sin(theta) * circleSize;
        this.ctx.beginPath();
        this.ctx.arc(this.width / 2 + cx, this.height / 2 + cy, draggingCircleSize, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#8FB658';
        this.ctx.fill();
      }
    }
  });

export { Slider };