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
        //默认是浅拷贝,深浅拷贝标识
        var deep = false
        //option用于存放arguments下标从1开始往后的所有元素,key用于存放该元素遍历的属性,
        //这里可能是因为是es5的问题,如果直接在for循环或者if里面申明,也一样会放到外部作用域,所以直接就在这里申明了
        var option, key, copy, src, copyIsArray, clone
        //如果第一个为布尔值,说明用户要选择深浅拷贝
        if (typeof target === 'boolean') {
            deep = target
            //那么target就往后挪了一个位置,所以是arguments[1]
            target = arguments[1]
            //那么同时,这里的i也要从下标2开始了
            i = 2
        }
        //判断target是否为一个object
        if (typeof target !== 'object') {
            target = {}
        }
        //等于i说明是扩展方法
        if (length === i) {
            //然后把target 设置为this i-- ,就可以复用下面的代码了
            //这里好像确实挺巧妙的,虽然要处理好几种情况,但是都是只改变了target和this就实现了
            target = this
            i--
        }
        //对应的是$.extend({},{age:12})
        //这里的i从1开始的,给参数附加属性
        for (; i < length; i++) {
            option = arguments[i]
            for (key in option) {
                if (option.hasOwnProperty(key)) {
                    //copy 为要借鉴的对象上的属性值
                    copy = option[key]
                    //src 为目标对象上的属性值,如果src没有的,说明没涉及到属性重复的问题
                    src = target[key]
                    //如果deep为true说明深拷贝,否则直接按照原来浅拷贝的走
                    //同时判断借鉴对象上的属性值是否为对象或数组,否则就不需要走深拷贝,直接赋值就行了
                    if (deep && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        if (copyIsArray) {
                            //重置判断的值
                            copyIsArray = false
                            //判断src是否已经有值了,如果没有就新建一个数组
                            clone = src && jQuery.isArray(src) ? src : []
                        } else {
                            //判断src是否已经有值了,如果没有就新建一个对象
                            clone = src && jQuery.isPlainObject(src) ? src : {}
                        }
                        target[key] = jQuery.extend(deep, clone, copy)
                    } else if (copy !== undefined) {

                        target[key] = copy
                    }
                }
            }
        }
        return target
    }



    //这样init出来的实例就可以共享到和jQuery原型的属性
    jQuery.fn.init.prototype = jQuery.fn

    jQuery.extend({
        isPlainObject: function (obj) {
            return toString.call(obj) === '[object Object]'
        },
        isArray: function (obj) {
            return toString.call(obj) === '[object Array]'
        }
    })

    // console.log(jQuery);


    root.$ = root.jQuery = jQuery

    // extend
})(this)