import {$} from "@core/dom";

export class Excel {

    constructor(selector, options) {
        this.$el = $(selector)
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el) // header -> excelComponent -> DomListener - он принимает рут html в конструктор
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

}