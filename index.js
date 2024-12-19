// Joy Patel, COMP 4610 201
// resources used: 
// - https://jqueryui.com/
// - pieces.json by Ramon Meza
$( function() {

    // array of images to be used for sources of tiles
    const imageFiles = [
        "Scrabble_Tile_A.jpg",
        "Scrabble_Tile_B.jpg",
        "Scrabble_Tile_C.jpg",
        "Scrabble_Tile_D.jpg",
        "Scrabble_Tile_E.jpg",
        "Scrabble_Tile_F.jpg", 
        "Scrabble_Tile_G.jpg",
        "Scrabble_Tile_H.jpg",
        "Scrabble_Tile_I.jpg",
        "Scrabble_Tile_J.jpg",
        "Scrabble_Tile_K.jpg",
        "Scrabble_Tile_L.jpg",
        "Scrabble_Tile_M.jpg",
        "Scrabble_Tile_N.jpg",
        "Scrabble_Tile_O.jpg",
        "Scrabble_Tile_P.jpg",
        "Scrabble_Tile_Q.jpg",
        "Scrabble_Tile_R.jpg",
        "Scrabble_Tile_S.jpg",
        "Scrabble_Tile_T.jpg",
        "Scrabble_Tile_U.jpg",
        "Scrabble_Tile_V.jpg",
        "Scrabble_Tile_W.jpg",
        "Scrabble_Tile_X.jpg",
        "Scrabble_Tile_Y.jpg",
        "Scrabble_Tile_Z.jpg",
        "Scrabble_Tile_Blank.jpg",
    ];

    // letters placed on droppables
    const word = {};
    // score mapping to letters
    let scoreMap = {};

    // load score map from pieces.json
    $.getJSON("pieces.json", function (data) {
        data.pieces.forEach((piece) => {
            scoreMap[piece.letter] = piece.value;
        });
    });

    // randomly set source of tile images
    $(".tile img").each(function () {
        const randomIndex = Math.floor(Math.random() * imageFiles.length);
        const randomImage = imageFiles[randomIndex];

        $(this).attr("src", `graphics_data/Scrabble_Tiles/${randomImage}`);
    });

    // make letter tiles draggable
    $( ".tile" ).draggable({ 
        snap: ".tile-droppable", 
        snapMode: "inner",
        revert: "invalid",
    });

    // manage droppable areas
    $( ".tile-droppable" ).droppable({
        drop: function( event, ui ) {
            const droppableId = $(this).attr("id");
            // check if droppable is a bonus square that doubles the score
            const isDouble = $(this).hasClass("double");
            // get letter from the draggable
            const letter = getLetter(ui.draggable)

            word[droppableId] = {letter , isDouble};
            console.log(`${word[droppableId]} dropped on ${droppableId}`);

            // snap draggable to center of droppable
            const droppableOffset = $(this).offset();
            const newLeft = droppableOffset.left + 5;
            const newTop = droppableOffset.top + 5;
            ui.draggable.css({
                top: newTop + "px",
                left: newLeft + "px",
                position: "absolute",
            });

            // update word after letter tile placement
            updateWord();
        },
      });

    //   update word construction
      function updateWord() {
        const droppables = $(".tile-droppable").map(function () {
            return $(this).attr("id");
        }).get();

        let Word = "";
        let Score = 0;
        droppables.forEach((id) => {
            if (word[id]) {
                const {letter, isDouble} = word[id];
                Word += letter;
                score = scoreMap[letter] || 0;
                if (isDouble) {
                    score *= 2;
                }
                Score += score;
            } else {
                Word += "_";
            }
        });

        console.log(`Constructed word: ${Word}`);
        // display word and score
        $(".word-score-container").text(`Word: ${Word} Score: ${Score}`);
    }

    // get letter from draggable tile
    function getLetter(tile) {
        const imgSrc = tile.find("img").attr("src");
        const match = imgSrc.match(/Scrabble_Tile_([A-Z]).jpg/); // Match the letter in the filename
        return match ? match[1] : "";
    }
  } );