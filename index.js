var fs = require('fs');

/// constants

const tableSize = 5;
const directions = ['NORTH', 'EAST', 'SOUTH', 'WEST']

/// read commands from file and execute

fs.readFile(process.argv[2], 'utf8', function(err, data) {
    if(err) {
        console.error("Could not open file: %s", err);
    }
    else {
        var commands = parseCommands(data.split('\n'));
    }
});

function parseCommands(lines) {
    var commands = []
    lines.forEach(function(stringCmd) {
        var cmd = stringCmd.split(/[ ]+/);
        var commandName = cmd[0].toLowerCase();
        if (robot.hasOwnProperty(commandName)) {
            if(commandName === 'place') {
                var args = cmd[1].split(',');
                robot.place(Number(args[0]), Number(args[1]), args[2])
            }
            else {
                robot[commandName]();
            }
        }
    });
}

/// robot implementation

var robot = {
    currentPosition: {},
    place: function(x, y, f) {
        if (x < 0 || x > tableSize - 1) {
            console.log('x:', x, ' is not a vallid cooridnate, table size is:', tableSize)
            return;
        }
        if (y < 0 || y > tableSize - 1) {
            console.log('y:', y, ' is not a vallid cooridnate, table size is:', tableSize)
            return;
        }
        if (directions.indexOf(f) === -1) {
            console.log('facing direction', f,  'is invalid');
            return;
        }

        robot.currentPosition = {x: x, y: y, facing: f};
    },
    move: function() {
        if(Object.keys(robot.currentPosition).length === 0) {
            return false;
        }
        robot.currentPosition = move(robot.currentPosition)
        return true;
        
    },
    left: function() {
        robot.currentPosition = turn(robot.currentPosition, 'LEFT')
    },
    right: function() {
        robot.currentPosition = turn(robot.currentPosition, 'RIGHT')
    },
    report: function() {
        console.log('current position: ' + JSON.stringify(robot.currentPosition));
    }
}

/// Helper functions

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

module.exports = {
    newFacingDirection: newFacingDirection,
    turn: turn,
    canMove: canMove,
    tableSize: tableSize,
    robot: robot
}
