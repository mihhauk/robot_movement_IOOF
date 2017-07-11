var robot = {
    currentPosition: {},
    move: function() {
        if(robot.currentPosition) {
            robot.currentPosition = move(robot.currentPosition)
        }
        else {
            console.log('place robot on the table');
        }
    },
    place: function(x, y, f) {
        robot.currentPosition = {x: x, y:y, facing: f};
    },
    report: function() {
        console.log('current position: ' + robot.currentPosition);
    }
}
const tableSize = 5;

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST']

function place(x, y, f) {
    return {x: x, y:y, }
}

function move(currentPosition) {
    var newPosition = Object.assign({}, currentPosition);
    if(canMove(currentPosition)) {
        if (currentPosition.facing === 'NORTH') {
            newPosition.y--;
        } else if (currentPosition.facing === 'SOUTH') {
            newPosition.y++;
        } else if (currentPosition.facing === 'WEST') {
            newPosition.x--;
        } else if (currentPosition.facing === 'EAST') {
            newPosition.x++;
        }
    }
    return newPosition
}

function canMove(currentPosition) {
    if (currentPosition.facing === 'NORTH' && currentPosition.y === 0) {
        return false;
    } else if (currentPosition.facing === 'SOUTH' && currentPosition.y === tableSize - 1) {
        return false;
    } else if (currentPosition.facing === 'EAST' && currentPosition.x === tableSize - 1) {
        return false;
    } else if (currentPosition.facing === 'WEST' && currentPosition.x === 0) {
        return false;
    }
    return true;
}

function turn(currentPosition, direction) {
    var newPosition = Object.assign({}, currentPosition);

    newPosition.facing = newFacingDirection(currentPosition.facing, direction);
    return newPosition;
}

function newFacingDirection(currentDirection, turnDirection) {
    var index = directions.indexOf(currentDirection);
    if (turnDirection === 'LEFT') {
        return directions[index ? index - 1:  directions.length - 1];  
    }
    else if (turnDirection === 'RIGHT') {
        return directions[index === directions.length - 1 ? 0 : index + 1]; 
    }
}


// robot.place(0,0,'SOUTH')
// robot.move();
console.log(robot.currentPosition);
module.exports = {
    newFacingDirection: newFacingDirection,
    turn: turn,
    canMove: canMove,
    tableSize: tableSize,
    robot: robot
}
