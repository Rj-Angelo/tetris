const constants = {
    field: {
        max_rows: 10,
        /* 10 columns for play 11th row to check game over */
        max_columns: 20
    },
    block: {
        shapes: [
            [
                [1,1],
                [1,1]
            ],
            [
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
                [1,0,0,0],
            ],
            [
                [0,1,1],
                [1,1,0],
                [0,0,0]
            ],
            [
                [1,1,0],
                [0,1,1],
                [0,0,0]
            ],
            [
                [1,0,0],
                [1,0,0],
                [1,1,0]
            ],
            [
                [0,1,0],
                [0,1,0],
                [1,1,0]
            ],
            [
                [1,1,1],
                [0,1,0],
                [0,0,0]
            ]
        ],
        movement: {
            rotate: "ArrowUp",
            left: "ArrowLeft",
            right: "ArrowRight",
            down: "ArrowDown"
        }
    }
}