class Block{
    constructor(){
        this.shape = constants.block.shapes[Math.floor(Math.random() * 7)]
        /* Center shape of block relative to its size vs the number of rows of the field */
        this.row_pos = Math.floor(constants.field.max_rows / 2) - Math.floor(this.shape[0].length / 2);
        this.col_pos = this.shape.length * -1;
        this.is_placed = false;
    }

    renderBlock = () => {
        /* remove block_piece class to remove movement trail */
        let field = document.getElementById("game-field");

        field.querySelectorAll(".block_piece").forEach(cell => {
            cell.classList.remove("block_piece");
        });

        for(let col = 0; col < this.shape.length; col++){
            for(let row = 0; row < this.shape[col].length; row++){
                
                if(this.shape[col][row]){
                    let field_col = this.col_pos + col;
                    let field_row = this.row_pos + row;
                    let col_element = field.children[field_col];
                    
                    if(col_element){
                        let cell = col_element.children[field_row];
                        cell.classList.add("block_piece");
                    }
                }
            }
        }
    }
    
    
    rotate = () => {
        /* No need to rotate squares */
        if(this.shape.length > 2){
            let len = this.shape.length;
            let block = [];
    
            /* Swap index of rows for index of columns */
            for(let row = 0; row < len; row++){
                let new_row = [];
    
                for(let col = len - 1; col >= 0; col--){
                    new_row.push(this.shape[col][row]);
                }
    
                block.push(new_row);
            }
    
            this.shape = block;
        }
    }

    moveBlock = (direction) => {
        let movement = {
            [constants.block.movement.rotate]: () => this.rotate(),
            [constants.block.movement.right]: () => this.row_pos++,
            [constants.block.movement.left]: () => this.row_pos--,
            [constants.block.movement.down]: () => this.col_pos++
        }

        if(!this.is_placed){
            movement[direction]();
        }
    }
}