(function (root) {
    var _ = {
        Callbacks: function (params) {
            var option = {}, run = false, starts, start = 0;
            if (typeof params === 'string') {
                var stateList = params.split(/\s+/)
                stateList.forEach(state => {
                    option[state] = true
                });
            }
            var fnlist = []
            function fire(data) {
                var index = 0
                if (option.memory) {
                    run = true
                    index = starts || 0
                }
                starts = 0
                for (; index < fnlist.length; index++) {
                    const fn = fnlist[index];
                    var flag = fn.apply(data[0], data[1])
                    if (option.stopOnFalse && !flag) {
                        break
                    }
                }
                if (option.once) {
                    fnlist.length = 0
                }
            }
            var obj = {
                add: function () {
                    start = fnlist.length
                    var arr = Array.prototype.slice.call(arguments)
                    arr.forEach((arg) => {
                        if (toString.call(arg) === '[object Function]') {
                            fnlist.push(arg)
                        }
                    })
                    if (option.memory && run) {
                        starts = start
                        fire([this])
                    }

                },
                fireWidth: function (context, arguments) {
                    fire([context, arguments])
                },
                fire: function () {
                    obj.fireWidth(this, arguments)
                }
            }


            return obj
        }
    }

    root._ = _
})(this)