class Field{
    constructor(rows, columns){
        this.rows = rows;
        this.columns = columns;
        this.shape = this.initializeField();
    }

    /* Initializes the empty field */
    initializeField = () => {
        let field = [];

        for(let col = 0; col < this.columns; col++){
            field.push(this.generateNewRow());
        }
        
        return field;
    }

    renderField = () => {
        let field = document.getElementById("game-field");
        field.innerHTML = "";

        for(let col = 0; col < this.columns; col++){
            let columns = document.createElement("div");
            columns.classList.add("column");

            for(let row = 0; row < this.rows; row++){
                let cell = document.createElement("div");
                cell.classList.add("cell");

                if(this.shape[col][row]){
                    cell.classList.add("field_piece");
                }

                columns.appendChild(cell);
            }

            field.appendChild(columns);
        }
    }

    /* Generate empty row */
    generateNewRow = () => {
        let new_row = [];
            
        for(let row = 0; row < this.rows; row++){
            new_row.push(0);
        }

        return new_row;
    }

    checkFieldRows = () => {
        let full_cols = [];
        
        for(let col = 0; col < this.columns; col++){
            let value = 0;
            let sum_of_rows = this.shape[col].reduce(
                (accumulator, current_value) => accumulator + current_value,
                value
            );

            if(sum_of_rows === this.rows){
                full_cols.push(col);
            }
        }

        return full_cols;
    }

    placeBlock = (block) => {
        for(let col = 0; col < block.shape.length; col++){
            for(let row = 0; row < block.shape[0].length; row++){
                let field_row = block.row_pos + row;
                let field_col = block.col_pos + col;

                if(block.shape[col][row]){
                    this.shape[field_col][field_row] = block.shape[col][row];
                }
            }
        }
    }

    /* removes blocks from the field */
    removeBlocks = (row_num) => {
        this.shape.splice(row_num, 1);
        this.shape.unshift(this.generateNewRow());
    }
}