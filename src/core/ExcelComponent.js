import {DomListener} from "@core/DomListener";

export class ExcelComponent extends DomListener{

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.emitter = options.emitter

        this.unsubs = []

        this.prepare()
    }

    prepare() {
    }

    toHTML() {
        return ''
    }

    $emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args)
    }

    $on(eventName, fn) {
        const unsub = this.emitter.subscribe(eventName, fn)
        this.unsubs.push(unsub)
    }

    init() {
        this.initDomListener()
    }

    destroy() {
        this.removeDomListener()

        this.unsubs.forEach(fn => fn())
    }

}