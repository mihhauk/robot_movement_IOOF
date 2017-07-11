var robot = {
    currentPosition: {},
}

const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST']

function move(currentPosition, direction) {
    var newPosition = Object.assign({}, currentPosition);

    if (direction === 'NORTH') {
        newPosition.x--;
    } else if (direction === 'SOUTH') {
        newPosition.x++;
    } else if (direction === 'WEST') {
        newPosition.y--;
    } else if (direction === 'EAST') {
        newPosition.y++;
    }
    return newPosition
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

module.exports = {
    newFacingDirection: newFacingDirection,
    turn: turn
}
