class Tetris {
    constructor(){
        this.field = new Field();
        this.block = new Block();
        this.isGameOver = false;

        document.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        let temp_block = this.block;

        
        /* check if move is valid */

        /* if move is valid allow move */
                    
        this.block.moveBlock(event.key);
        this.block.renderBlock();
        /* else do not allow move */


    }

    gameLoop = () => {
        if(!this.block.is_placed){
            this.block.moveBlock(constants.block.movement.down);

            this.block.renderBlock();
        }
        else{
            this.block = new Block();
        }

        let collision = this.field.checkField(this.block)
        
        if(collision){
            this.field.placeBlock(this.block);
            this.block.is_placed = true;

            let full_cols = this.field.checkFieldRows();

            if(full_cols.length){
                for(let col = 0; col < full_cols.length; col++){
                    this.field.removeBlocks(full_cols[col]);
                }
            }

            this.field.renderField();
        }
    }

    startGame = () => {
        this.field.renderField();
        this.gameInterval = setInterval(this.gameLoop, 500);
    }
}

let tetris = new Tetris();
tetris.startGame();
