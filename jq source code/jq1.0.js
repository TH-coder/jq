// //利用自执行函数形成独立的函数作用域
// (function (root) {
//     var jQuery = function () {
//         //返回一个init的new对象,那么它就拥有jQuery原型上的方法了
//         return new jQuery.prototype.init()
//     }
//     jQuery.fn = jQuery.prototype = {
//         init: function () {
//         },
//     }

//     //extend
//     jQuery.fn.extend = jQuery.extend = function () {
//         // if (arguments.length === 2) {
//         //     var source = arguments[0];
//         //     var target = arguments[1];
//         //     for (const key in target) {
//         //         if (object.hasOwnProperty(key)) {
//         //             source[key] = target[key]
//         //         }
//         //     }
//         // } else if (arguments.length === 1) {
//         //     var obj = arguments[0]
//         //     for (const key in obj) {
//         //         if (obj.hasOwnProperty(key)) {
//         //             jQuery[key] = obj[key];
//         //         }
//         //     }
//         // }

//         console.log(this);




//         // var target = arguments[0] || {};
//         // var length = arguments.length;
//         // if(typeof target !== 'object'){
//         //     target = {}
//         // }
//     }

//     //jQuery与自身的原型对象上面的init方法共享原型对象
//     jQuery.prototype.init.prototype = jQuery.prototype;

//     //把jquery注册到全局作用域上
//     root.$ = root.jQuery = jQuery;
// })(window)


//立即执行函数,保护私有变量,避免全局污染
(function (root) {
    var jQuery = function () {
        //调用$('..')会返回一个实例,非new创建实例,用一个init方法
        return new jQuery.prototype.init()
    }
    //fn是为了简写,我感觉没啥其他意义
    jQuery.fn = jQuery.prototype = {
        //创建jq实例的init方法
        init: function () {

        },
        css: function () {

        }
    }
    //虽然extend有很多种调用方式,但是jq都是视为一个方法,内部再判断处理
    jQuery.fn.extend = jQuery.extend = function () {
        //这里有点思想,target代表目标,在下面可以是要拓展的对象,也可以是jQuery或者jQuery上的原型
        var target = arguments[0] || {}
        /*
        一开始这里不是很理解为什么要用length存储,不直接用arguments,
        后来发现因为这个length会用到多个地方,所以这样写也是为了方便和性能
        */
        var length = arguments.length
        //这里的i用的好像很巧妙又很奇怪
        var i = 1
        //判断target是否为一个object
        if (typeof target !== 'object') {
            target = {}
        }
        //等于i说明是扩展方法
        if (length === i) {
            target = this
        }
    }

    //这样init出来的实例就可以共享到和jQuery原型的属性
    jQuery.fn.init.prototype = jQuery.fn
    root.$ = root.jQuery = jQuery

    // extend
})(this)