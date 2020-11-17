function debounce(func, wait, immediate) {
    let timeout
    return function () {
        const context = this
        const args = arguments
        const later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate & !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}
export const tableMask = {
    // 指令的定义
    inserted: function (el, binding) {
        console.log('inserted')
        const pinId = binding.arg
        const maskDiv = document.createElement('div')
        maskDiv.className = 'tableMask'
        maskDiv.style.position = 'fixed'
        maskDiv.style.width = '100%'
        maskDiv.style.border = '5px solid red'
        maskDiv.style['z-index'] = '10'
        maskDiv.style.height = '100%'
        maskDiv.style.top = '100px'
        maskDiv.style.display = 'none'
        maskDiv.ref = 'mask'
        el && el.appendChild(maskDiv)
        const showMask = function () {
            const pin = document.getElementById(pinId)
            if (pin) {
                maskDiv.style.display = ''
                debounce(() => {
                    maskDiv.style.display = 'none'
                }, 250)()
            }
        }
        el.showMask = showMask
        window.addEventListener('scroll', showMask)
        // window.addEventListener('mousewheel', showMask)
    },
    update: function () {
        console.log('update')
    },
    componentUpdated: function () {
        console.log('componentUpdated')
    },
    unbind: function (el) {
        window.removeEventListener('scroll', el.showMask)
        console.log('unbind')
    }
}
