//利用自执行函数形成独立的函数作用域
(function (root) {
    var jQuery = function () {
        //返回一个init的new对象,那么它就拥有jQuery原型上的方法了
        return new jQuery.prototype.init()
    }
    jQuery.fn = jQuery.prototype = {
        init: function () {
        },
    }

    //extend
    jQuery.fn.extend = jQuery.extend = function () {
        // if (arguments.length === 2) {
        //     var source = arguments[0];
        //     var target = arguments[1];
        //     for (const key in target) {
        //         if (object.hasOwnProperty(key)) {
        //             source[key] = target[key]
        //         }
        //     }
        // } else if (arguments.length === 1) {
        //     var obj = arguments[0]
        //     for (const key in obj) {
        //         if (obj.hasOwnProperty(key)) {
        //             jQuery[key] = obj[key];
        //         }
        //     }
        // }

        console.log(this);




        // var target = arguments[0] || {};
        // var length = arguments.length;
        // if(typeof target !== 'object'){
        //     target = {}
        // }
    }

    //jQuery与自身的原型对象上面的init方法共享原型对象
    jQuery.prototype.init.prototype = jQuery.prototype;

    //把jquery注册到全局作用域上
    root.$ = root.jQuery = jQuery;
})(window)
