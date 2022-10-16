const CELL_LEN = 20;
const CELL_MARGIN = 2;
const ROW_NUM = 90;
const COL_NUM = 180;

let interval_id;
const next_gen_board = [];
const cells = []; 
create_cells();
activate_button();

function create_cells() {
    const container = document.querySelector(".container");
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

            row.appendChild(cells[i][j]);
        }
    }
}

function activate_button() {
    const button = document.querySelector("button");
    button.addEventListener("click", run_animation);
}

function run_animation(e) {
    e.target.classList.toggle("running");
    if (e.target.classList.contains("running")) {
        interval_id = setInterval(update_cells, 100);
    } else {
        clearInterval(interval_id);
    }
}

function update_cells() {
    evaluate_next_gen();
    repaint_cells()

}

function evaluate_next_gen() {
    for (let i = 0; i < ROW_NUM; i++) {
        next_gen_board[i] = [];
        for (let j = 0; j < COL_NUM; j++) {
            next_gen_board[i][j] = evaluate_cell_state(i, j);
        }
    }
}

function evaluate_cell_state(row, col) {
    let neightbour_count = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let valid_position = (row + i > 0) && 
                (row + i < ROW_NUM) && 
                (col + j > 0) && 
                (col + j < COL_NUM) && 
                (i != 0 || j != 0);
            if (valid_position && cells[row + i][col + j].classList.contains("alive")) {
                neightbour_count++;
            }
        }
    }

    return (neightbour_count == 3 || 
            (neightbour_count == 2 && cells[row][col].classList.contains("alive")));
}

function repaint_cells() {
    for (let i = 0; i < ROW_NUM; i++) {
        for (let j = 0; j < COL_NUM; j++) {
            if (next_gen_board[i][j]) {
                cells[i][j].classList.add("alive");
            } else {
                cells[i][j].classList.remove("alive");
            }
        }
    }
}