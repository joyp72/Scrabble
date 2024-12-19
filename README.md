# COMP 4610 GUI assignment

GitHub URL: https://joyp72.github.io/Scrabble/
GitHub repo: https://github.com/joyp72/Scrabble

- Letter tiles are randomly generated using the scrablle tile images provided in graphics_data. An array of images is defined that includes all the image sources of tiles, for each letter tile element, an random is picked from the array to be the source.
- Letter tiles can be dragged-and-dropped onto target Scrabble squares with the help of jQuery draggable and droppable widgets.
- Identifiction of which letter tiles are dragged into which droppable slot is implemented by making use of the id attributes of the droppable elements and a dedicated function to retrieve letter given a corresponding letter tile element. This function pulls the letter form the name of the source of the image used for the letter tile.
- The board contains two bonus square that doubles the score of the letters placed upon it.
- The score is tallied correctly with consideration of special squares. The tile elements containing bonus squares are given a class 'double' which is checked for when calculation of the score is performed.
- Any number of letter tiles can be played.
- The board can be cleared and the user can always restart the game by clicking the 'Restart' button


