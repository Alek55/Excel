import {capitalize} from "@core/utils";

export class DomListener {

    constructor($root, listeners = []) {
        if(!$root) throw new Error(`No $root provided for DomListener`)
        this.$root = $root
        this.listeners = listeners
    }

    initDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if(!this[method]) throw new Error(`Method is not implemented in ${this.name} Component`)
            this[method] = this[method].bind(this) // bind создает новую функцию и на removeEventListener callback не удалялся, поэтому мы перезаписали
            this.$root.on(listener, this[method]) // root - dom object, formula.onInput()
        })
    }

    removeDomListener() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }

}

function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}