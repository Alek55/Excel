const CODES = {
    A: 65,
    Z: 90
}

function createCol(col, index) {
    return `<div class="column" data-type="resizable" data-col="${index}">
${col}
<div class="col-resize" data-resize="col"></div>
</div>`
}

// function createCell(row, col) {
//     return `<div class="cell" contenteditable="" data-col="${col}" data-row="${row}"></div>`
// }

function createCell(row) {
    return function (_, col) {
        return `
            <div 
                class="cell"
                contenteditable
                data-type="cell"
                data-col="${col}"
                data-id="${row}:${col}"
            >
            </div>
`
    }
}

function createRow(index, content) {
    const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : ''

    return `
    <div class="row" data-type="resizable">
        <div class="row-info">
            ${index ? index : ''}
            ${resizer}
        </div>
        <div class="row-data">${content}</div>
      </div>
    `
}

export function createTable(rowsCount = 15) {
    const colsCount = CODES.Z - CODES.A + 1 // from A to Z
    const rows = []
    const cols = new Array(colsCount)
        .fill('')
        .map((el, index) => String.fromCharCode(CODES.A + index))
        .map(createCol)
        .join('')

    rows.push(createRow(null, cols))

    for(let row = 0; row < rowsCount; row++) {
        const cells = new Array(colsCount)
            .fill('')
            //.map((_, col) => createCell(row, col))
            .map(createCell(row))
            .join('')

        rows.push(createRow(row + 1, cells))
    }

    return rows.join('')
}