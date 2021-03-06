import {$} from "@core/dom";

export function resizeHandler($root, event) {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize // col or row
    const sideProp = type === 'col' ? 'bottom' : 'right'
    let delta

    $resizer.css({opacity: 1, [sideProp]: '-5000px'})

    document.onmousemove = e => {
        if(type === 'col') {
            delta = e.pageX - coords.right
            $resizer.css({right: -delta + 'px'})
        }
        else {
            delta = e.pageY - coords.bottom
            $resizer.css({bottom: -delta + 'px'})
        }
    }
    document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null

        if(type === 'col') {
            $parent.css({width: coords.width + delta + 'px'})
            $root.findAll(`[data-col="${$parent.data.col}"]`).forEach(el => el.style.width = coords.width + delta + 'px')
        }
        else $parent.css({height: coords.height + delta + 'px'})

        $resizer.css({opacity: 0, bottom: 0, right: 0})
    }
}