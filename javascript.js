create_cells();

function create_cells() {
    const container = document.querySelector(".container");
    const CELL_LEN = 20;
    const CELL_MARGIN = 2;
    const ROW_NUM = 90;
    const COL_NUM = 180;

    let cells = [];
    for (let i = 0; i < ROW_NUM; i++) {
        cells[i] = [];
        let row = document.createElement("div");
        row.classList.toggle("row");
        container.appendChild(row);

        for (let j = 0; j < COL_NUM; j++) {
            cells[i][j] = document.createElement("div");
            cells[i][j].classList.toggle("cell");
            cells[i][j].style.height = `${CELL_LEN}px`;
            cells[i][j].style.width = `${CELL_LEN}px`;
            cells[i][j].style.margin = `${CELL_MARGIN / 2}px`;
            cells[i][j].addEventListener("mousedown", e => {
                e.target.classList.toggle("alive");
            })
            cells[i][j].addEventListener("mouseenter", e => {
                if (e.buttons === 1) e.target.classList.add("alive");
            })

            // Below are code for displaying cell coordinates
            // cells[i][j].textContent = `${i}, ${j}`;
            // cells[i][j].style.color = "black";
            // cells[i][j].style.fontSize = "xx-small";

            row.appendChild(cells[i][j]);
        }
    }
    return cells;
}
