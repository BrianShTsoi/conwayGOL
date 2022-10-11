create_cells();

function create_cells() {
    const container = document.querySelector(".container");
    const CELL_LEN = 20;
    const row_num = Math.round(container.clientHeight / (CELL_LEN + 2));
    const col_num = Math.round(container.clientWidth / (CELL_LEN + 2));

    let cells = [];
    for (let i = 0; i < row_num; i++) {
        cells[i] = [];
        let row = document.createElement("div");
        row.classList.toggle("row");
        container.appendChild(row);

        for (let j = 0; j < col_num; j++) {
            cells[i][j] = document.createElement("div");
            cells[i][j].classList.toggle("cell");
            cells[i][j].style.height = `${CELL_LEN}px`
            cells[i][j].style.width = `${CELL_LEN}px`
            row.appendChild(cells[i][j]);
        }
    }
    return cells;
}
