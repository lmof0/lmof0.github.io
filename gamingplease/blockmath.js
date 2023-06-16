var m4 = {
  perspective: function(fieldOfViewInRadians, aspect, near, far) {
    var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
    var rangeInv = 1.0 / (near - far);
 
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  },
  
  projection: function(width, height, depth) {
	// Note: This matrix flips the Y axis so 0 is at the top.
	return [
	   2 / width, 0, 0, 0,
	   0, -2 / height, 0, 0,
	   0, 0, 2 / depth, 0,
	  -1, 1, 0, 1,
	];
  },
	  
  translation: function(tx, ty, tz) {
	return [
	   1,  0,  0,  0,
	   0,  1,  0,  0,
	   0,  0,  1,  0,
	   tx, ty, tz, 1,
	];
  },
 
  xRotation: function(angleInRadians) {
	var c = Math.cos(angleInRadians);
	var s = Math.sin(angleInRadians);
 
	return [
	  1, 0, 0, 0,
	  0, c, s, 0,
	  0, -s, c, 0,
	  0, 0, 0, 1,
	];
  },
 
  yRotation: function(angleInRadians) {
	var c = Math.cos(angleInRadians);
	var s = Math.sin(angleInRadians);
 
	return [
	  c, 0, -s, 0,
	  0, 1, 0, 0,
	  s, 0, c, 0,
	  0, 0, 0, 1,
	];
  },
 
  zRotation: function(angleInRadians) {
	var c = Math.cos(angleInRadians);
	var s = Math.sin(angleInRadians);
 
	return [
	   c, s, 0, 0,
	  -s, c, 0, 0,
	   0, 0, 1, 0,
	   0, 0, 0, 1,
	];
  },
 
  scaling: function(sx, sy, sz) {
	return [
	  sx, 0,  0,  0,
	  0, sy,  0,  0,
	  0,  0, sz,  0,
	  0,  0,  0,  1,
	];
  },

  translate: function(m, tx, ty, tz) {
	return m4.multiply(m, m4.translation(tx, ty, tz));
  },
 
  xRotate: function(m, angleInRadians) {
	return m4.multiply(m, m4.xRotation(angleInRadians));
  },
 
  yRotate: function(m, angleInRadians) {
	return m4.multiply(m, m4.yRotation(angleInRadians));
  },
 
  zRotate: function(m, angleInRadians) {
	return m4.multiply(m, m4.zRotation(angleInRadians));
  },
 
  scale: function(m, sx, sy, sz) {
	return m4.multiply(m, m4.scaling(sx, sy, sz));
  },
  
  multiply: function(a, b) {
	var b00 = b[0 * 4 + 0];
	var b01 = b[0 * 4 + 1];
	var b02 = b[0 * 4 + 2];
	var b03 = b[0 * 4 + 3];
	var b10 = b[1 * 4 + 0];
	var b11 = b[1 * 4 + 1];
	var b12 = b[1 * 4 + 2];
	var b13 = b[1 * 4 + 3];
	var b20 = b[2 * 4 + 0];
	var b21 = b[2 * 4 + 1];
	var b22 = b[2 * 4 + 2];
	var b23 = b[2 * 4 + 3];
	var b30 = b[3 * 4 + 0];
	var b31 = b[3 * 4 + 1];
	var b32 = b[3 * 4 + 2];
	var b33 = b[3 * 4 + 3];
	var a00 = a[0 * 4 + 0];
	var a01 = a[0 * 4 + 1];
	var a02 = a[0 * 4 + 2];
	var a03 = a[0 * 4 + 3];
	var a10 = a[1 * 4 + 0];
	var a11 = a[1 * 4 + 1];
	var a12 = a[1 * 4 + 2];
	var a13 = a[1 * 4 + 3];
	var a20 = a[2 * 4 + 0];
	var a21 = a[2 * 4 + 1];
	var a22 = a[2 * 4 + 2];
	var a23 = a[2 * 4 + 3];
	var a30 = a[3 * 4 + 0];
	var a31 = a[3 * 4 + 1];
	var a32 = a[3 * 4 + 2];
	var a33 = a[3 * 4 + 3];
 
	return [
	  b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
	  b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
	  b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
	  b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
	  b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
	  b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
	  b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
	  b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
	  b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
	  b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
	  b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
	  b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
	  b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
	  b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
	  b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
	  b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
	];
  },
};

//seeded random function, courtesy of http://davidbau.com/archives/2010/01/30/random_seeds_coded_hints_and_quintillions.html
(function(a,b,c,d,e,f){function k(a){var b,c=a.length,e=this,f=0,g=e.i=e.j=0,h=e.S=[];for(c||(a=[c++]);d>f;)h[f]=f++;for(f=0;d>f;f++)h[f]=h[g=j&g+a[f%c]+(b=h[f])],h[g]=b;(e.g=function(a){for(var b,c=0,f=e.i,g=e.j,h=e.S;a--;)b=h[f=j&f+1],c=c*d+h[j&(h[f]=h[g=j&g+b])+(h[g]=b)];return e.i=f,e.j=g,c})(d)}function l(a,b){var e,c=[],d=(typeof a)[0];if(b&&"o"==d)for(e in a)try{c.push(l(a[e],b-1))}catch(f){}return c.length?c:"s"==d?a:a+"\0"}function m(a,b){for(var d,c=a+"",e=0;c.length>e;)b[j&e]=j&(d^=19*b[j&e])+c.charCodeAt(e++);return o(b)}function n(c){try{return a.crypto.getRandomValues(c=new Uint8Array(d)),o(c)}catch(e){return[+new Date,a,a.navigator.plugins,a.screen,o(b)]}}function o(a){return String.fromCharCode.apply(0,a)}var g=c.pow(d,e),h=c.pow(2,f),i=2*h,j=d-1;c.seedrandom=function(a,f){var j=[],p=m(l(f?[a,o(b)]:0 in arguments?a:n(),3),j),q=new k(j);return m(o(q.S),b),c.random=function(){for(var a=q.g(e),b=g,c=0;h>a;)a=(a+c)*d,b*=d,c=q.g(1);for(;a>=i;)a/=2,b/=2,c>>>=1;return(a+c)/b},p},m(c.random(),b)})(this,[],Math,256,6,52);
// also courtesy of ortiel('s cookie clicker)

/*let perlin = {
	random_vector: function() {
		let theta = Math.random()*2*Math.PI;
		return {x: Math.cos(theta), y: Math.sin(theta)};
	},
	dot_prod
}*/