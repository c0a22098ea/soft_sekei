// テトロミノをランダムに生成する
function createTetromino() {
    const minoes = [
        {
            shape: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            color: 'cyan',
            name: 'I',
            x: 3,
            y: -1
        },
        {
            shape: [
                [1, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            color: 'blue',
            name: 'J',
            x: 4,
            y: 0
        },
        {
            shape: [
                [0, 0, 1],
                [1, 1, 1],
                [0, 0, 0]
            ],
            color: 'orange',
            name: 'L',
            x: 4,
            y: 0
        }
    ];

    // ランダムに1つ選んで返す。ただしTetrisのルールではない。
    return minoes[Math.floor(Math.random() * minoes.length)];
}

export { createTetromino };