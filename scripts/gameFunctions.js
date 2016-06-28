

/* ============================================================================
																Explorer Mode
 ============================================================================ */
/*
 * Returns the number 1 if the gameTypeString is 1 player and the number 2 if
 * the gameTypeString is 2 players. If the gameTypeString is invalid it should
 * return false.
 *
 * valid options include: '1', 'one', '2', or 'two'.
 * The function should be case insensitive, so 'one' and 'ONE' should both
 * result in true.
 */
function validateGameType(gameTypeString) {
	// TODO just having an if typeOf statement breaks this function and it makes NO SENSE!
	if (typeof gameTypeString === 'string') {
		if (gameTypeString === '1' || gameTypeString.toLowerCase() === 'one') {
			return 1;
		} else if (gameTypeString === '2' || gameTypeString.toLowerCase() === 'two') {
			return 2;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

/*
 * Returns the players name if it is a valid name. Valid names must only contain
 * letters, hyphens or spaces and must contain at least one letter. Returns
 * false if the name is not valid.
 */

function validateName(name) {
	if (/^[a-zA-Z-'\s]+$/.test(name) && /^[a-zA-Z]+$/.test(name)) {
		return name;
	} else {
		return false;
	}
}

/*
 * Randomly generates and returns a name for a computer player.
 */
function generateComputerName() {
	var computerName = "";
  var possibleCharacters = "abcdefghijklmnopqrstuvwxyz";
	var randomLength = Math.ceil(Math.random*10 + 1);

  for(var i=0; i < 5; i++ ) {
		computerName += possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
	}
	return computerName;
}

/*
 * Validate a yes/no answer. If the yesNoString is 'y' or 'yes' then the
 * function should return true. If the yesNoString is 'n' or 'no' then the
 * function should return false. If the yesNoString is neither of those options
 * then the function should return null. The function should be case
 * insensitive, so it should accept both 'Y' and 'y' for example.
 */
function validateYesNo(yesNoString) {
	if (yesNoString.toLowerCase() === 'y' || yesNoString.toLowerCase() === 'yes') {
		return true;
	} else if (yesNoString.toLowerCase() === 'n' || yesNoString.toLowerCase() === 'no') {
		return false;
	} else {
		return null;
	}
}

/*
 * Return the player (either 'X' or 'O') who should go next, based on the
 * current player. If the currentPlayer is 'X' then the function should return
 * 'O' and vice versa.
 */
function getNextPlayer(currentPlayer) {
	if (currentPlayer === 'X') {
		return 'O';
	} else {
		return 'X';
	}
}

/*
 * Convert the gameBoard matrix to a string. You can use \n to denote a newline
 * within a string. For a matrix like this:
 * gameBoard = [
 *     [' ', 'X', ' '],
 *     [' ', ' ', ' '],
 *     [' ', ' ', ' '],
 * ]
 * the resulting string should look like this:
 *      1   2   3
 *   ~~~~~~~~~~~~~
 * 1 |   | X |   |
 *   ~~~~~~~~~~~~~
 * 2 |   |   |   |
 *   ~~~~~~~~~~~~~
 * 3 |   |   |   |
 *   ~~~~~~~~~~~~~
 */
function getGameBoardString(gameBoard) {
	return '     1   2   3 \n  ~~~~~~~~~~~~~\n1 | ' + gameBoard[0][0] + ' | ' + gameBoard[0][1] + ' | ' + gameBoard[0][2] + ' |\n  ~~~~~~~~~~~~~\n2 | ' + gameBoard[1][0] + ' | ' + gameBoard[1][1] + ' | ' + gameBoard[1][2] + ' |\n  ~~~~~~~~~~~~~\n3 | ' + gameBoard[2][0] + ' | ' + gameBoard[2][1] + ' | ' + gameBoard[2][2] + ' |\n  ~~~~~~~~~~~~~\n';
}

/*
 * Return the number of empty spaces that currently exist within the gameBoard
 * matrix. This function should work regardless of the size of the game board.
 * For example, the game board might be 3x3, 4x4, or 5x7.
 */
function getEmptySpaceCount(gameBoard) {
	var emptySpaces = 0;
	for (var i = 0; i < gameBoard.length; i++) {
		for (var space = 0; space < gameBoard[i].length; space++) {
			if (gameBoard[i][space] === ' ') {
				emptySpaces++;
			}
		}
  }
	return emptySpaces;
}


/* ============================================================================
																Adventurer Mode
 ============================================================================ */
/*
 * Given a playerString (either 'X' or 'O'), a moveObject and a gameBoard
 * matrix, make the move on the gameBoard and return the gameBoard.
 */
function makeMove(playerString, moveObject, gameBoard) {
	var row = gameBoard[moveObject.y];

	row.splice(moveObject.x, 1, playerString);
	gameBoard.splice(moveObject.y, 1, row);

	return gameBoard;
}


/*
 * Determine and return the winning player (either 'X' or 'O') based on the
 * gameBoard matrix. If there is no winner than the function should return null.
 */
function getWinner(gameBoard) {
	var winner;
	var winnerFound = false;
	// Test if someone has a full row
	gameBoard.forEach(function(row, i) {
		 if (row[0] === row[1] && row[0] === row[2] && row[0] !== ' ') {
			winner = row[0];
			winnerFound = true;
		 }
	 });
	 // Test if someone has a full column
	 if (gameBoard[0][0] !== ' ' && gameBoard[0][0] === gameBoard[1][0] && gameBoard[0][0] === gameBoard[2][0]) {
		 winner = gameBoard[0][0];
		 winnerFound = true;
	 } else if (gameBoard[0][1] !== ' ' && gameBoard[0][1] === gameBoard[1][1] && gameBoard[0][1] === gameBoard[2][1]) {
		 winner = gameBoard[0][1];
		 winnerFound = true;
	 } else if (gameBoard[0][2] !== ' ' && gameBoard[0][2] === gameBoard[1][2] && gameBoard[0][2] === gameBoard[2][2]) {
		 winner = gameBoard[0][2];
		 winnerFound = true;
	 }
	 // Test if someone has a diagonal win
	 if (gameBoard[0][0] !== ' ' && gameBoard[0][0] === gameBoard[1][1] && gameBoard[0][0] === gameBoard[2][2]) {
		 winner = gameBoard[0][0];
		 winnerFound = true;
	 } else if (gameBoard[0][2] !== ' ' && gameBoard[0][2] === gameBoard[1][1] && gameBoard[0][2] === gameBoard[2][0]) {
		 winner = gameBoard[0][2];
		 winnerFound = true;
	 }

	 if (winnerFound === true) {
		 return winner;
	 } else {
		 return null;
	 }

}

/*
 * Converts the moveString (which should be in the formate 'x y') into an object
 * with x and y properties as numbers. The x and y properties in the object
 * should be numbers that correspond to positions in the gameBoard matrix.
 *
 * For example:
 * If the moveString was '2 3' then the return value should be:
 * {
 *	  x: 1,
 *	  y: 2
 * }
 *
 * Notice that the values in the return object are one less than the inpute
 * values. This is because the gameBoard is zero-indexed (meaning it starts at
 * position 0 instead of position 1 so every position is one smaller than the
 * values in the moveString).
 *
 * If the moveString is not in the correct format (ie. 'x y') then the function
 * should throw an 'Invalid input: the move must be in the format "x y"'
 * exception.
 */
function parseMove(moveString) {
	// Check if it's valid
	if (typeof moveString !== "string" || moveString.length !== 3 || moveString.match(/[a-z]/i) || moveString.indexOf(' ') === -1) {
		throw 'Invalid input: the move must be in the format "x y"';
	} else {
		var moves = moveString.split(' ');
		var moveObject = {
    	x: moves[0]-1,
    	y: moves[1]-1
    };
		return moveObject;
	}
}

/*
 * Validate the moveObject.
 *
 * If the x and y coordinates in the moveObject are outside the game board (ie.
 * they are greater than 2 or less than 0) then the function should throw an
 * 'Invalid move: the coordinates are outside the game board' exception.
 *
 * If the position on the gameBoard associated with the x and y coordinates is
 * already taken (ie. the associated position on the game board is *not* and
 * single space) then the function should throw an 'Invalid move: that spot is
 * already taken' exception.
 *
 * If there are no errors then the function should return the move object.
 */
function validateMove(moveObject, gameBoard) {
	if (moveObject.x < 0 || moveObject.y < 0 || moveObject.x > gameBoard[0].length-1 || moveObject.y > gameBoard.length-1) {
		throw 'Invalid move: the coordinates are outside the game board';
	} else if (gameBoard[moveObject.y][moveObject.x] !== ' '){
		throw 'Invalid move: that spot is already taken';
	} else {
		return moveObject;
	}

}

/* ============================================================================
																Epic Mode
 ============================================================================ */
/*
 * Receives a player (either 'X' or 'O') and a game board. Returns the best move
 * for the chosen player based on the following algorithm:
 *
 * Choose the first available move:
 * 1. Win: If the player has two in a row, they can place a third to get three
 *    in a row.
 * 2. Block: If the opponent has two in a row, the player must play the third
 *    themselves to block the opponent.
 * 3. Fork: Create an opportunity where the player has two threats to win (two
 *    non-blocked lines of 2).
 * 4. Blocking an opponent's fork:
 *       Option 1: The player should create two in a row to force the opponent
 *                 into defending, as long as it doesn't result in them creating
 *                 a fork. For example, if "X" has a corner, "O" has the center,
 *                 and "X" has the opposite corner as well, "O" must not play a
 *                 corner in order to win. (Playing a corner in this scenario
 *                 creates a fork for "X" to win.)
 *       Option 2: If there is a configuration where the opponent can fork, the
 *                 player should block that fork.
 * 7. Center: A player marks the center. (If it is the first move of the game,
 *    playing on a corner gives "O" more opportunities to make a mistake and may
 *    therefore be the better choice; however, it makes no difference between
 *    perfect players.)
 * 8. Opposite corner: If the opponent is in the corner, the player plays the
 *    opposite corner.
 * 9. Empty corner: The player plays in a corner square.
 * 10 Empty side: The player plays in a middle square on any of the 4 sides.
 *
 * This strategy taken from wikipedia:
 * https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy
 *
 * You may want to break this function up into more tha one other functions.
 * Perhaps one for each type of moves a player could make.
 *
 * The move should be returned as a move object with x and y properties. For
 * example: { x: 0, y: 0 }.
 */
function getComputerPlayerMove(player, gameBoard) {
	var opponent;
	if (player === 'X') {
		opponent = 'O';
	} else {
		opponent = 'X';
	}

	var moveObject = {
		x: 0,
		y: 0
	};
	var moveFound = false;







	// 1 WIN!
	gameBoard.forEach(function(row, i) {
		if (player === row[0] || player === row[1] || player === row[2]) {
			// Rows
			if (row[0] === player && row[1] === player  && row[2] === ' ') { // ROW: XXO
				moveObject.x = 2;
				moveObject.y = i;
				moveFound = true;
				console.log('Win: 1');
			} else if (row[0] === ' ' && row[1] === player && row[2] === player) { // ROW OXX
				moveObject.x = 0;
				moveObject.y = i;
				moveFound = true;
				console.log('Win: 2');
			} else if (row[0] === player && row[1] === ' ' && row[2] === player) { // ROW XOX
				moveObject.x = 1;
				moveObject.y = i;
				moveFound = true;
				console.log('Win: 3');
				// Columns
			} else if (gameBoard[0][i] === player && gameBoard[1][i] === player && gameBoard[2][i] === ' ') { // COL XXO
				moveObject.x = i;
				moveObject.y = 2;
				moveFound = true;
				console.log('Win: 4');
			} else if (gameBoard[0][i] === ' ' && gameBoard[1][i] === player && gameBoard[2][i] === player) { // COL OXX
				moveObject.x = i;
				moveObject.y = 0;
				moveFound = true;
				console.log('Win: 5');
			} else if (gameBoard[0][i] === player && gameBoard[1][i] === ' ' && gameBoard[2][i] === player) { // COL XOX
				moveObject.x = i;
				moveObject.y = 1;
				moveFound = true;
				console.log('Win: 6');
			}
		}
	});
	if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][2] === ' ') {
		moveObject.x = 2;
		moveObject.y = 2;
		moveFound = true;
		console.log('Win: 7');
	} else if (gameBoard[0][0] === ' ' && gameBoard[1][1] === player && gameBoard[2][2] === player) {
		moveObject.x = 0;
		moveObject.y = 0;
		moveFound = true;
		console.log('Win: 8');
	} else if (gameBoard[0][0] === player && gameBoard[1][1] === ' ' && gameBoard[2][2] === player) {
		moveObject.x = 1;
		moveObject.y = 1;
		moveFound = true;
		console.log('Win: 9');
	} else if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][0] === ' ') {
		moveObject.x = 0; // - - X
		moveObject.y = 2; // - X -
		moveFound = true; // M - -
		console.log('Win: 10');
	} else if (gameBoard[0][2] === ' ' && gameBoard[1][1] === player && gameBoard[2][0] === player ) {
		moveObject.x = 2; // - - |
		moveObject.y = 0; // - X -
		moveFound = true; // X - -
		console.log('Win: 11');
	} else if (gameBoard[0][2] === player && gameBoard[1][1] === ' ' && gameBoard[2][0] === player ) {
		moveObject.x = 1;
		moveObject.y = 1;
		moveFound = true;
		console.log('Win: 12');
	}
	if (moveFound) {
		// If we found a winning move, take it!
		return moveObject;
	}








	// 2 Block winning move
	gameBoard.forEach(function(row, i) {
		if (opponent === row[0] || opponent === row[1] || opponent === row[2]) {
			// Rows
			if (row[0] === opponent && row[1] === opponent  && row[2] === ' ') { // ROW: XXO
				moveObject.x = 2; // O O M
				moveObject.y = i; // O O M
				moveFound = true; // O O M
				console.log('blockWin: 1');
			} else if (row[0] === ' ' && row[1] === opponent && row[2] === opponent) { // ROW OXX
				moveObject.x = 0; // M O O
				moveObject.y = i; // M O O
				moveFound = true; // M O O
				console.log('blockWin: 2');
			} else if (row[0] === opponent && row[1] === ' ' && row[2] === opponent) { // ROW XOX
				moveObject.x = 1; // O M O
				moveObject.y = i; // O M O
				moveFound = true; // O M O
				console.log('blockWin: 3');
				// Columns
			} else if (gameBoard[0][i] === opponent && gameBoard[1][i] === opponent && gameBoard[2][i] === ' ') { // COL XXO
				moveObject.x = i; // O O O
				moveObject.y = 2; // O O O
				moveFound = true; // M M M
				console.log('blockWin: 4');
			} else if (gameBoard[0][i] === ' ' && gameBoard[1][i] === opponent && gameBoard[2][i] === opponent) { // COL OXX
				moveObject.x = i; // M M M
				moveObject.y = 0; // O O O
				moveFound = true; // O O O
				console.log('blockWin: 5');
			} else if (gameBoard[0][i] === opponent && gameBoard[1][i] === ' ' && gameBoard[2][i] === opponent) { // COL XOX
				moveObject.x = i; // O O O
				moveObject.y = 1; // M M M
				moveFound = true; // O O O
				console.log('blockWin: 6');
			}
		}
	});
	if (gameBoard[0][0] === opponent && gameBoard[1][1] === opponent && gameBoard[2][2] === ' ') {
		moveObject.x = 2; // O - -
		moveObject.y = 2; // - O -
		moveFound = true; // - - M
		console.log('blockWin: 7');
	} else if (gameBoard[0][0] === ' ' && gameBoard[1][1] === opponent && gameBoard[2][2] === opponent) {
		moveObject.x = 0; // M - -
		moveObject.y = 0; // - O -
		moveFound = true; // - - O
		console.log('blockWin: 8');
	} else if (gameBoard[0][0] === opponent && gameBoard[1][1] === ' ' && gameBoard[2][2] === opponent) {
		moveObject.x = 1; // O - -
		moveObject.y = 1; // - M -
		moveFound = true; // - - O
		console.log('blockWin: 9');
	} else if (gameBoard[0][2] === opponent && gameBoard[1][1] === opponent && gameBoard[2][0] === ' ') {
		moveObject.x = 2; // - - O
		moveObject.y = 0; // - O -
		moveFound = true; // M - -
		console.log('blockWin: 10');
	} else if (gameBoard[0][2] === ' ' && gameBoard[1][1] === opponent && gameBoard[2][0] === opponent ) {
		moveObject.x = 0; // - - M
		moveObject.y = 2; // - O -
		moveFound = true; // O - -
		console.log('blockWin: 11');
	} else if (gameBoard[0][2] === opponent && gameBoard[1][1] === ' ' && gameBoard[2][0] === opponent ) {
		moveObject.x = 1; // - - O
		moveObject.y = 1; // - M -
		moveFound = true; // O - -
		console.log('blockWin: 12');
	}
	if (moveFound) {
		// If we found a blocking move: take it!
		return moveObject;
	}


	// 3 Fork
	if (gameBoard[0][1] === player && gameBoard[1][1] === ' '  && gameBoard[1][0] === player && gameBoard[1][2] === ' ' && gameBoard[2][1] === ' ') {
		moveObject.x = 1; // - X -
		moveObject.y = 1; // X M |
		moveFound = true; // - | -
		console.log('Fork0: 1');
	} else if (gameBoard[0][1] === player && gameBoard[1][1] === ' '  && gameBoard[1][2] === player && gameBoard[1][0] === ' ' && gameBoard[2][1] === ' ') {
		moveObject.x = 1; // - X -
		moveObject.y = 1; // | M X
		moveFound = true; // - | -
		console.log('Fork0: 2');
	} else if (gameBoard[0][1] === ' ' && gameBoard[1][1] === ' '  && gameBoard[1][2] === player && gameBoard[1][0] === ' ' && gameBoard[2][1] === player) {
		moveObject.x = 1; // - | -
		moveObject.y = 1; // | M X
		moveFound = true; // - X -
		console.log('Fork0: 3');
	} else if (gameBoard[0][1] === ' ' && gameBoard[1][1] === ' '  && gameBoard[1][2] === ' ' && gameBoard[1][0] === player && gameBoard[2][1] === player) {
		moveObject.x = 1; // - | -
		moveObject.y = 1; // X M |
		moveFound = true; // - X -
		console.log('Fork0: 4');

		// New fork type
	} else if (gameBoard[0][1] === player && gameBoard[0][2] === ' '  && gameBoard[1][2] === player && gameBoard[0][0] === ' ' && gameBoard[2][2] === ' ') {
		moveObject.x = 2; // | X M
		moveObject.y = 0; // - - X
		moveFound = true; // - - |
		console.log('Fork1: 1');
	} else if (gameBoard[1][2] === player && gameBoard[2][2] === ' '  && gameBoard[2][1] === player && gameBoard[0][2] === ' ' && gameBoard[2][0] === ' ') {
		moveObject.x = 2; // - - |
		moveObject.y = 0; // - - X
		moveFound = true; // | X M
		console.log('Fork1: 2');
	} else if (gameBoard[1][0] === player && gameBoard[2][0] === ' '  && gameBoard[2][1] === player && gameBoard[0][0] === ' ' && gameBoard[2][2] === ' ') {
		moveObject.x = 2; // | - -
		moveObject.y = 0; // X - -
		moveFound = true; // M X |
		console.log('Fork1: 3');
	} else if (gameBoard[1][0] === player && gameBoard[0][0] === ' '  && gameBoard[0][1] === player && gameBoard[0][2] === ' ' && gameBoard[2][0] === ' ') {
		moveObject.x = 2; // M X |
		moveObject.y = 0; // X - -
		moveFound = true; // | - -
		console.log('Fork1: 4');

	// New fork type
	} else if (gameBoard[1][1] === player && gameBoard[2][1] === player  && gameBoard[2][2] === ' ' && gameBoard[0][0] === ' ' && gameBoard[2][0] === ' ') {
			moveObject.x = 2; // | O -
			moveObject.y = 2; // - X -
			moveFound = true; // | X M
			console.log('Fork2: 1');
	} else if (gameBoard[1][1] === player && gameBoard[2][1] === player  && gameBoard[2][2] === ' ' && gameBoard[0][2] === ' ' && gameBoard[2][0] === ' ') {
				moveObject.x = 0; // - O |
				moveObject.y = 2; // - X -
				moveFound = true; // M X |
				console.log('Fork2: 2');
	} else if (gameBoard[1][1] === player && gameBoard[1][0] === player  && gameBoard[0][2] === ' ' && gameBoard[0][0] === ' ' && gameBoard[2][0] === ' ') {
				moveObject.x = 0; // | - |
				moveObject.y = 2; // X X O
				moveFound = true; // M - -
				console.log('Fork2: 3');
	} else if (gameBoard[1][1] === player && gameBoard[1][0] === player  && gameBoard[2][2] === ' ' && gameBoard[2][0] === ' ' && gameBoard[0][0] === ' ') {
				moveObject.x = 0; // M - -
				moveObject.y = 0; // X X O
				moveFound = true; // | - |
				console.log('Fork2: 4');
	} else if (gameBoard[1][1] === player && gameBoard[0][1] === player  && gameBoard[2][2] === ' ' && gameBoard[0][2] === ' ' && gameBoard[0][0] === ' ') {
				moveObject.x = 0; // M X |
				moveObject.y = 0; // - X -
				moveFound = true; // - O |
				console.log('Fork2: 5');
	} else if (gameBoard[1][1] === player && gameBoard[0][1] === player  && gameBoard[0][0] === ' ' && gameBoard[2][0] === ' ' && gameBoard[0][2] === ' ') {
				moveObject.x = 2; // | X M
				moveObject.y = 0; // - X -
				moveFound = true; // | O -
				console.log('Fork2: 6');
	} else if (gameBoard[1][1] === player && gameBoard[1][2] === player  && gameBoard[2][0] === ' ' && gameBoard[2][2] === ' ' && gameBoard[0][2] === ' ') {
				moveObject.x = 2; // - - M
				moveObject.y = 0; // O X X
				moveFound = true; // | - |
				console.log('Fork2: 7');
	} else if (gameBoard[1][1] === player && gameBoard[1][2] === player  && gameBoard[0][0] === ' ' && gameBoard[0][2] === ' ' && gameBoard[2][2] === ' ') {
				moveObject.x = 2; // | - |
				moveObject.y = 2; // O X X
				moveFound = true; // - - M
				console.log('Fork2: 8');



	// New fork type
} else if (gameBoard[0][0] === ' ' && gameBoard[1][1] === player && gameBoard[2][0] === player && gameBoard[2][2] === ' ' && gameBoard[2][1] === ' ') {
					moveObject.x = 2; // | - O
					moveObject.y = 2; // - X -
					moveFound = true; // X | M
					console.log('Fork3: 1');
	} else if (gameBoard[0][2] === ' ' && gameBoard[1][1] === player && gameBoard[2][0] === ' ' && gameBoard[2][2] === player && gameBoard[2][1] === ' ') {
					moveObject.x = 0; // O - |
					moveObject.y = 2; // - X -
					moveFound = true; // M | X
					console.log('Fork3: 2');
	} else if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[2][0] === ' ' && gameBoard[0][2] === ' ' && gameBoard[1][0] === ' ') {
					moveObject.x = 0; // X - |
					moveObject.y = 2; // | X -
					moveFound = true; // M - -
					console.log('Fork3: 3');
	} else if (gameBoard[0][0] === ' ' && gameBoard[1][1] === player && gameBoard[2][0] === player && gameBoard[2][2] === ' ' && gameBoard[1][0] === ' ') {
					moveObject.x = 0; // M - -
					moveObject.y = 0; // | X -
					moveFound = true; // X - |
					console.log('Fork3: 4');
	} else if (gameBoard[0][0] === ' ' && gameBoard[1][1] === player && gameBoard[0][2] === player && gameBoard[2][2] === ' ' && gameBoard[0][1] === ' ') {
					moveObject.x = 0; // M | X
					moveObject.y = 0; // - X -
					moveFound = true; // - - |
					console.log('Fork3: 5');
	} else if (gameBoard[0][0] === player && gameBoard[1][1] === player && gameBoard[0][2] === ' ' && gameBoard[2][0] === ' ' && gameBoard[0][1] === ' ') {
					moveObject.x = 2; // X | M
					moveObject.y = 0; // - X -
					moveFound = true; // | - -
					console.log('Fork3: 6');
	} else if (gameBoard[0][2] === ' ' && gameBoard[1][1] === player && gameBoard[2][2] === player && gameBoard[1][2] === ' ' && gameBoard[2][0] === ' ') {
					moveObject.x = 2; // - - M
					moveObject.y = 0; // - X |
					moveFound = true; // | - X
					console.log('Fork3: 7');
	} else if (gameBoard[0][2] === player && gameBoard[1][1] === player && gameBoard[2][2] === ' ' && gameBoard[0][0] === ' ' && gameBoard[1][2] === ' ') {
					moveObject.x = 2; // | - X
					moveObject.y = 2; // - X |
					moveFound = true; // - - M
					console.log('Fork3: 8');
	}

	if (moveFound) {
		// If we found a FORK move
		return moveObject;
	}

	// 4 Block opponents fork by setting up a win.
	gameBoard.forEach(function(row, i) {
		if (player === row[0] || player === row[1] || player === row[2]) {
			// Rows
			if (row[0] === player && row[1] === ' '  && row[2] === ' ') {
				moveObject.x = 2; // X | M
				moveObject.y = i; // X | M
				moveFound = true; // X | M
				console.log('Set up for win: 1');
			} else if (row[0] === ' ' && row[1] === ' ' && row[2] ===  player) {
				moveObject.x = 0; // M | X
				moveObject.y = i; // M | X
				moveFound = true; // M | X
				console.log('Set up for win: 2');
			} else if (gameBoard[0][i] === player && gameBoard[1][i] === ' ' && gameBoard[2][i] === ' ') {
				moveObject.x = i; // X - -
				moveObject.y = 2; // | - -
				moveFound = true; // M - -
				console.log('Set up for win: 3');
			} else if (gameBoard[0][i] === ' ' && gameBoard[1][i] === ' ' && gameBoard[2][i] === player) {
				moveObject.x = i; // M - -
				moveObject.y = 2; // | - -
				moveFound = true; // X - -
				console.log('Set up for win: 4');
			} else if (gameBoard[0][0] === player && gameBoard[1][1] === ' ' && gameBoard[2][2] === ' ') {
				moveObject.x = 2; // X - -
				moveObject.y = 2; // - | -
				moveFound = true; // - - M
				console.log('Set up for win: 5');
			} else if (gameBoard[0][0] === ' ' && gameBoard[1][1] === ' ' && gameBoard[2][2] === player) {
				moveObject.x = 0; // M - -
				moveObject.y = 0; // - | -
				moveFound = true; // - - X
				console.log('Set up for win: 6');
			}	else if (gameBoard[2][0] === player && gameBoard[1][1] === ' ' && gameBoard[0][2] === ' ') {
			 moveObject.x = 2; // - - M
			 moveObject.y = 0; // - | -
			 moveFound = true; // X - -
			 console.log('Set up for win: 1');
		  }	else if (gameBoard[2][0] === ' ' && gameBoard[1][1] === ' ' && gameBoard[0][2] === player) {
				moveObject.x = 0; // - - X
				moveObject.y = 2; // - | -
				moveFound = true; // M - -
				console.log('Set up for win: 8');
			}
		}
	});

	// 7. Middle
	if (gameBoard[1][1] === ' ') {
				moveObject.x = 1; // - - -
				moveObject.y = 1; // - M -
				moveFound = true; // - - -
				console.log('Middle');
	}
	if (moveFound) {
		// If we found an Empty Corner
		return moveObject;
	}

	// 8 Opposite Corner
	if (gameBoard[0][2] === ' ' && gameBoard[2][0] === opponent) {
				moveObject.x = 2; // - - M
				moveObject.y = 0; // - - -
				moveFound = true; // O - -
				console.log('Opposite corner: 1');
	} else if (gameBoard[2][2] === ' ' && gameBoard[0][0] === opponent) {
				moveObject.x = 2; // O - -
				moveObject.y = 2; // - - -
				moveFound = true; // - - M
				console.log('Opposite corner: 2');
	} else if (gameBoard[2][0] === ' ' && gameBoard[0][2] === opponent) {
				moveObject.x = 2; // - - O
				moveObject.y = 0; // - - -
				moveFound = true; // M - -
				console.log('Opposite corner: 3');
	} else if (gameBoard[0][0] === ' ' && gameBoard[2][2] === opponent) {
				moveObject.x = 0; // M - -
				moveObject.y = 0; // - - -
				moveFound = true; // - - O
			  console.log('Opposite corner: 4');
	}
	if (moveFound) {
		// If we found an Empty Corner
		return moveObject;
	}


	// 9 Empty Corner
	if (gameBoard[0][2] === ' ') {
				moveObject.x = 2; // - - M
				moveObject.y = 0; // - - -
				moveFound = true; // - - -
				console.log('empty corner: 1');
	} else if (gameBoard[2][2] === ' ') {
				moveObject.x = 2; // - - -
				moveObject.y = 2; // - - -
				moveFound = true; // - - M
				console.log('empty corner: 2');
	} else if (gameBoard[2][0] === ' ') {
				moveObject.x = 0; // - - -
				moveObject.y = 2; // - - -
				moveFound = true; // M - -
				console.log('empty corner: 3');
	} else if (gameBoard[0][0] === ' ') {
				moveObject.x = 0; // M - -
				moveObject.y = 0; // - - -
				moveFound = true; // - - -
				console.log('empty corner: 4');
	}
	if (moveFound) {
		// If we found an Empty Corner
		return moveObject;
	}






	// 10. Side
	if (gameBoard[0][1] === ' ') {
				moveObject.x = 1; // - M -
				moveObject.y = 0; // - - -
				moveFound = true; // - - -
				console.log('empty side: 1');
	} else if (gameBoard[1][2] === ' ') {
				moveObject.x = 2; // - - -
				moveObject.y = 1; // - - M
				moveFound = true; // - - -
				console.log('empty side: 2');
	} else if (gameBoard[2][1] === ' ') {
				moveObject.x = 1; // - - -
				moveObject.y = 2; // - - -
				moveFound = true; // - M -
				console.log('empty side: 3');
	} else if (gameBoard[1][0] === ' ') {
				moveObject.x = 0; // - - -
				moveObject.y = 1; // M - -
				moveFound = true; // - - -
				console.log('empty side: 4');
	}

	 return moveObject;
}


// 	// This code just moves to the next available space instead of using the
// 	// algorithm outlined above.
// 	for(var y = 0; y < gameBoard.length; y++) {
// 		for(var x = 0; x < gameBoard[y].length; x++) {
// 			if(gameBoard[y][x] === ' ') {
// 				return {x: x, y: y};
// 			}
// 		}
// 	}
// 	return null;
// }

/* ============================================================================
															Don't mess with this code :)
 ============================================================================ */
module.exports = {
	validateGameType: validateGameType,
	validateName: validateName,
	generateComputerName: generateComputerName,
	parseMove: parseMove,
	validateMove: validateMove,
	getGameBoardString: getGameBoardString,
	makeMove: makeMove,
	getEmptySpaceCount: getEmptySpaceCount,
	getNextPlayer: getNextPlayer,
	getWinner: getWinner,
	validateYesNo: validateYesNo,
	getComputerPlayerMove: getComputerPlayerMove
};
