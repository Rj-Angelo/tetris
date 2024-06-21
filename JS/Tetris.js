class Tetris {
    constructor(){
        this.field = new Field(constants.field.max_rows, constants.field.max_columns);
        this.block = new Block();
        this.isGameOver = false;
        this.gameInterval;

        document.addEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        this.block.moveBlock(event.key, this.field);
        this.block.renderBlock();
        
        if(this.block.is_placed){
            try{
                this.field.placeBlock(this.block);
            }
            catch{
                this.isGameOver = true;
            }
            
            let full_cols = this.field.checkFieldRows();

            if(full_cols.length){
                for(let col = 0; col < full_cols.length; col++){
                    this.field.removeBlocks(full_cols[col]);
                }
            }
            
            this.field.renderField();
        }
    }

    gameLoop = () => {
        if(this.isGameOver){
            this.endGame();
        }
        else if(!this.block.is_placed){
            this.handleKeyDown({key: constants.block.movement.down});
        }
        else{
            this.block = new Block();
        }
    }

    startGame = () => {
        this.field.renderField();
        console.log(this.field.shape)
        this.gameInterval = setInterval(this.gameLoop, 500);
    }

    endGame = () => {
        clearInterval(this.gameInterval);
        document.removeEventListener("keydown", this.handleKeyDown);
        alert("Game Over");
    }
}

let tetris = new Tetris();
tetris.startGame();
