import {$} from "@core/dom";
import {Emitter} from "@core/Emitter";

export class Excel {

    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []

        this.emitter = new Emitter()
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, {emitter: this.emitter}) // header -> excelComponent -> DomListener - он принимает рут html в конструктор
            $el.html(component.toHTML())
            $root.append($el)

            return component // в components вместо классов будут их инстансы
        })

        return $root
    }

    render() {
        this.$el.append(this.getRoot())

        this.components.forEach(component => component.init())
    }

    destroy() {
        this.components.forEach(component => component.destroy())
    }

}