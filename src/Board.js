// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //create a variable to represent current row and assign it to this.get(rowIndex)
      // console.log(this.rows());

      let row = this.get(rowIndex);

      //create a count variable to keep track of how many (rooks, queens) are in the row
      let count = 0;

      //Iterate over the row
      for (let i = 0; i < row.length; i++) {
        //  If element is equal to 1
        if (row[i] === 1) {
          //  Increment Count by 1
          count++;
        }
        //if (count > 1) --> return true
        if (count > 1) {
          return true;
        }

      }
      // Return false (placeholder)
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var chessBoard = this.rows();
      // console.log(chessBoard);
      //we can iterate over the chessBoard
      for (var i = 0; i < chessBoard.length; i++) {
        //  passing inner array to  hasRowConflictAt method
        if (this.hasRowConflictAt(i)) {
          //  If true --> return true;
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // set var for column, count
      let chessBoard = this.rows();

      let count = 0;
      // iterate over column
      for (var i = 0; i < chessBoard.length; i++) {
        // if element is one
        if (chessBoard[i][colIndex] === 1) {
          // increment count
          count++;
        }
        // if count is greater than 1
        if (count > 1) {
          // return true;
          return true;
        }
      }
      // return false;
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // debugger;
      // create chessboard var and assign this.row()
      let chessBoard = this.rows();
      // iterate over the chessboard
      for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard.length; j++) {
        // passing each column to hasColConflictAt();
          if (this.hasColConflictAt(chessBoard[i][j])) { // 0,
            // if hasColConflictAt(i) is true
            // return true
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // create chessboard with this.rows()
      // debugger;
      let chessBoard = this.rows();
      let rowIndex = 0;
      let colIndex = majorDiagonalColumnIndexAtFirstRow; //-3

      // create count and initialize 0
      let count = 0;

      // iterate over the chessboard (nested for loops)
      for (let i = 0; i < chessBoard.length; i++) {


        // for (let j = colIndex; j < chessBoard.length; j++) {
        //   if the element is 1 (stop the current inner array --continue)
        if (colIndex < 0) {
          rowIndex++;
          colIndex++;
          // ***
          continue;
        }
        if (chessBoard[rowIndex][colIndex] === 1) {
          //   we are going to move to next inner array & find [+1][+1]
          count++; // 1
        }

        if (count > 1) {
          //   if the value of that position is 1 => conflict
          return true;
        }
        rowIndex++;
        colIndex++;
        // }
      }
      //    repeat
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //Create a chessBoard variable
      let chessBoard = this.rows();
      let length = chessBoard.length - 1;
      //iterate over the chessBoard
      for (let i = 0 - length; i < length; i++) {
        //If hasMajorDiagonalConflictsAt(i)
        if (this.hasMajorDiagonalConflictAt(i)) {
          //  If true, return true
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {

      // create chessboard
      let chessboard = this.rows();
      // create row index(0) and col index(minorDiagonalColumnIndexAtFirstRow)
      let rowIndex = 0;
      let colIndex = minorDiagonalColumnIndexAtFirstRow;
      // set count variable
      let count = 0;

      // iterate over the chessboard
      for (let i = 0; i < chessboard.length; i++) {
        if (colIndex < 0) {
          rowIndex++;
          colIndex--;
          // ***
          continue;
        }

        // if element at row index & col index is equal to 1
        if (chessboard[rowIndex][colIndex] === 1) {
          //   increment the count
          count++;
        }
        if (count > 1) {
          return true;
        }
        rowIndex++;
        colIndex--;
      }
      // if they didn't fine true unntil the end, return false
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // debugger;
      //Create a chessBoard variable
      let chessBoard = this.rows();
      let length = (chessBoard.length * 2);
      //iterate over the chessBoard
      for (let i = 0; i < length; i++) {
        //If hasMajorDiagonalConflictsAt(i)
        if (this.hasMinorDiagonalConflictAt(i)) {
          //  If true, return true
          return true;
        }
      }
      return false; // fixme // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
