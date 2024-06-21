class Block{
    constructor(){
        this.shape = constants.block.shapes[Math.floor(Math.random() * 7)]
        /* Center shape of block relative to its size vs the number of rows of the field */
        this.row_pos = Math.floor(constants.field.max_rows / 2) - Math.floor(this.getSolidShape() / 2);
        /* Start the position of block as the negative value of the shapes lenght */
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
    
            return block;
        }
    }

    moveBlock = (direction, field) => {
        const movement = {
            [constants.block.movement.rotate]: () => {
                let new_shape = this.rotate();

                if(this.checkCollision(new_shape, this.row_pos, this.col_pos, field)){
                    this.shape = new_shape;
                }
            },
            [constants.block.movement.right]: () => {
                if(this.checkCollision(this.shape, this.row_pos + 1, this.col_pos, field)){
                    this.row_pos++;
                }
            },
            [constants.block.movement.left]: () => {
                if(this.checkCollision(this.shape, this.row_pos - 1, this.col_pos, field)){
                    this.row_pos--;
                }
            },
            [constants.block.movement.down]: () => {
                if(this.checkCollision(this.shape, this.row_pos, this.col_pos + 1, field)){
                    this.col_pos++;
                }
                else{
                    this.is_placed = true;
                }
            }
        }

        if(!this.is_placed){
            movement[direction]();
        }
    }

    getSolidShape = () => {
        let final_solid_index = 0;

        for(let col = 0; col < this.shape.length; col++){
            let row_solid_index = 0;

            for(let row = 0; row < this.shape[col].length; row++){
                if(this.shape[col][row]){
                    row_solid_index = row
                }
            }

            if(final_solid_index < row_solid_index){
                final_solid_index = row_solid_index;
            }
        }
        /* Return the solid index +1 to offset */
        return final_solid_index + 1;
    }

    /* Checks the current field and block position for collision */
    checkCollision = (shape, block_row, block_col, field) => {        
        /* column position can be negative add check to make sure we only evaluate if block is in play */
        for(let col = 0; col < shape.length; col++){
            for(let row = 0; row < shape[col].length; row++){
                let field_row = block_row + row;
                let field_col = block_col + col;
                
                if(shape[col][row]){
                    if(field_col < 0 && block_row === this.row_pos){
                        return true;
                    }

                    if((block_row + row < 0 || block_row + row >= field.rows) ||
                        field_col === field.columns ||
                        (field_col >= 0 && field.shape[field_col][field_row])){
                        return false;
                    }
                }
            }
        }

        return true;
    }
}