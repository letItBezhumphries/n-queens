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

window.findNRooksSolution = function(n) {
  var start = new Date();
  var board = new Board({'n': n});
  var solution = board.rows();
  //start board.togglePiece(0, 0)
  //go to row 1, togglePiece a position that has no ColConflict
  //base: row === n, return solution
  //recursive: for loop of all index of a row, togglePiece(row, index),
  //if no ColConflict, recurse(row+1)
  //if is ColConflict, togglePiece again

  var search = function(rowIndex) {
    if (rowIndex === n) {
      return solution;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(rowIndex, i);
      if (!board.hasColConflictAt(i)) {
        search(rowIndex + 1);
      } else {
        board.togglePiece(rowIndex, i);
      }
    }
  };

  search(0);
  var end = new Date();
  console.log('Runtime: ' + (end - start) + ' milliseconds. Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({'n': n});
  var solutionCount = 0;
  //toggle(0, 0) i = 0; row === n, count++
  //i = 0....n-1
  //(0, 0) => 1 solution
  //(0, 1)
  var count = function(rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(rowIndex, i); //toggle(0,0)//toggle(1,0), untoggle(1,0)//toggle(1, 1)
        if (!board.hasColConflictAt(i)) {
          count(rowIndex + 1); //count(1)//count(2)//count(3)//untoggle count 3 pc//untoggle count 2 pc
        }
        board.togglePiece(rowIndex, i);//untoggle(0,0)
      }
    }
  };

  count(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({ 'n': n });
  var solution = undefined;

  var search = function(rowIndex) {
    //check 1) rowIndex = n; 2) total of matrix = n
    var matrixSum = board.rows().flat().reduce(function(result, item) {
      return result + item;
    }, 0);

    if (rowIndex === n && matrixSum === n) {
      solution = board.rows();
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(rowIndex, i);//toggle(0,1)
        if (!board.hasAnyQueenConflictsOn(rowIndex, i)) {
          search(rowIndex + 1);//search(4)
          if (solution) {
            return solution;
          }
        }
        board.togglePiece(rowIndex, i);
      }
    }
  };

  search(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  if (solution === undefined) {
    return board.rows();
  }
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({ 'n': n });
  var solutionCount = 0;

  var count = function(rowIndex) {
    var matrixSum = board.rows().flat().reduce(function(result, item) {
      return result + item;
    }, 0);

    if (rowIndex === n && matrixSum === n) {
      solutionCount++;
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(rowIndex, i);//toggle(0,1)
        if (!board.hasAnyQueenConflictsOn(rowIndex, i)) {
          count(rowIndex + 1);//search(4)
        }
        board.togglePiece(rowIndex, i);
      }
    }
  };

  count(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
