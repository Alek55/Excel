export function capitalize(string) {
    if(typeof string !== 'string') return ''
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export function range(start, end) {
    if(start > end) { // в обратном порядке, например от Z до A
        [end, start] = [start, end]
    }

    return new Array(end - start + 1)
        .fill('')
        .map((_, index) => start + index) // 0 + 0 = 0; 0 + 1 = 1; ...
}
