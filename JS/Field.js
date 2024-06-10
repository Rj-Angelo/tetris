class Field{
    constructor(){
        this.rows = constants.field.max_rows;
        this.columns = constants.field.max_columns + constants.game_over_line;
        this.field = this.initializeField();
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

        for(let col = 0; col < this.columns-1; col++){
            let columns = document.createElement("div");
            columns.classList.add("column");

            for(let row = 0; row < this.rows; row++){
                let cell = document.createElement("div");
                cell.classList.add("cell");

                if(this.field[col][row]){
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

    /* Checks the current field and block position for collision */
    checkField = (block) => {
        /* column position can be negative add check to make sure we only evaluate if block is in play */
        if(block.col_pos > 0){
            for(let col = 0; col < block.shape.length; col++){
                for(let row = 0; row < block.shape[col].length; row++){
                    let field_row = block.row_pos + row;
                    let field_col = block.col_pos + col;

                    /* Check if falling block has hit field block or hit bottom*/
                    if(block.shape[col][row] && field_col === this.columns - constants.game_over_line ||
                        block.shape[col][row] && this.field[field_col][field_row]){

                        return true;
                    }
                }
            }
        }

        return false
    }

    checkFieldRows = () => {
        let full_cols = [];
        
        for(let col = 0; col < this.columns; col++){
            let value = 0;
            let sum_of_rows = this.field[col].reduce(
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
            /* Add an offset here as collision detection is detecting if blocks are overlapped instead of if blocks are underneath */
            let field_col = block.col_pos + col - constants.offset;

            if(block.shape[col][row]){
              this.field[field_col][field_row] = block.shape[col][row];
            }
          }
        }
    }

    /* removes blocks from the field */
    removeBlocks = (row_num) => {
        this.field.splice(row_num, 1);
        this.field.unshift(this.generateNewRow());
    }
}