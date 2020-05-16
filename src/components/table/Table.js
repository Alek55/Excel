import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {resizeHandler} from "@/components/table/table.resize";
import {TableSelection} from "@/components/table/TableSelection";
import {$} from "@core/dom";
import {matrix, nextSelector} from "@/components/table/table.functions";

export class Table extends ExcelComponent{

    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable()
    }

    prepare() {
        // вызывается до метода init - т.к. в конструкторе -- html уже вывелся, но обработчики еще не повешены

        this.selection = new TableSelection()
    }

    init() {
        super.init() // вызывается после отрисовки в браузере

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this.$on('changeFormulaText', text => this.selection.current.text(text))
        this.$on('changeFocusTable', () => this.selection.current.focus())
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('tableSelect', $cell)
    }

    onMousedown(event) {
        if(event.target.dataset.resize) resizeHandler(this.$root, event)
        else if(event.target.dataset.type === 'cell') {
            const $target = $(event.target)
            if(event.shiftKey) {
                const $cells = matrix($target.id(true), this.selection.current.id(true))
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            }
            else this.selectCell($target)
        }

    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
        const {key} = event
        if(keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))

            this.selectCell($next)
        }
    }

    onInput(event) {
        this.$emit('tableInput', $(event.target))
    }

    destroy() {
        super.destroy()
    }
}