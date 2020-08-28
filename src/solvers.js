/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/* Solution Example

    [
      [1, 0, 0, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]

    */



window.findNRooksSolution = function(n) {

  // Create new board instances that have access to all the helper methods you write in src/Board.js
  var solution = new Board({n: n}); //fixme

  // var board = new Board({n: n});
  // console.log(solution);
  // console.log(n);

  //Iterate over the n
  for (var i = 0; i < n; i++) {
    //Start from i = 0
    //  chessboard = Solution.rows()
    var chessBoard = solution.rows();

    //Place a rook (1) at chessBoard[i][i]
    chessBoard[i][i] = 1;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return chessBoard;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount; //fixme

  //Create a chessBoard
  //Create a variable for row


  //Iterate over the chessBoard rows
  //  If !this.hasAnyRooksCoflicts(row, colIndex)
  //  Call togglePiece on row, colIndex
  // hasAnyRooksConflicts()

  //  chessBoard.togglePiece(row, i)


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
