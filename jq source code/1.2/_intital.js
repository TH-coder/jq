(function (root) {
    function flatConcat(arr) {
        var newArr = []
        for (var index = 0; index < arr.length; index++) {
            var element = arr[index];
            if (isFunction(element)) {
                newArr.push(element)

            } else if (isArray(element)) {
                newArr = newArr.concat(flatConcat(element))
            }
        }
        return newArr
    }


    function Callbacks(state) {

        var obj = {
            once: false,
            stopOnFalse: false,
            menmorny: false,
            once: false,
        }, fnList = [], i = 0;

        if (typeof state === 'string') {
            state.split(/\s+|,/).forEach((item) => {
                obj[item] = true
            })
        }

        obj.add = function () {
            fnList = fnList.concat(flatConcat(arguments))
        }
        obj.fire = function () {
            for (var i = 0; i < fnList.length; i++) {
                var fn = fnList[i]
                // if (state === 'unique') {
                //     for (let k = fnList.length - 1; k >= 0; k--) {
                //         if (fn === fnList[k] && k !== i) return
                //     }
                // }
                var bool = fn()
                if (state === 'stopOnFalse' && bool === false) {
                    return this
                }
            }
            if (state === 'once') {
                fnList.length = 0
            }
            return this
        }
        return obj
    }


    function isArray(obj) {
        return toString.call(obj) === "[object Array]";
    }

    function isFunction(fn) {
        return toString.call(fn) === "[object Function]";
    }

    root._ = {
        Callbacks
    }
})(this)