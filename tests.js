var index = require('./index');
var expect = require('chai').expect;


describe('newFacingDirection', () => {
  it('turn NORTH LEFT', () => {
    expect(index.newFacingDirection('NORTH', 'LEFT')).to.equal('WEST');
  });
  it('turn NORTH RIGHT', () => {
    expect(index.newFacingDirection('NORTH', 'RIGHT')).to.equal('EAST');
  });
  it('turn SOUTH LEFT', () => {
    expect(index.newFacingDirection('SOUTH', 'LEFT')).to.equal('EAST');
  });
  it('turn SOUTH RIGHT', () => {
    expect(index.newFacingDirection('SOUTH', 'RIGHT')).to.equal('WEST');
  });
  it('turn EAST LEFT', () => {
    expect(index.newFacingDirection('EAST', 'LEFT')).to.equal('NORTH');
  });
  it('turn EAST RIGHT', () => {
    expect(index.newFacingDirection('EAST', 'RIGHT')).to.equal('SOUTH');
  });
  it('turn WEST LEFT', () => {
    expect(index.newFacingDirection('WEST', 'LEFT')).to.equal('SOUTH');
  });
  it('turn WEST RIGHT', () => {
    expect(index.newFacingDirection('WEST', 'RIGHT')).to.equal('NORTH');
  });

});

describe('turn', () => {
  var currentPosition = {
      x:0, y:0,
      facing: 'NORTH'
  }
  it('turn NORTH LEFT', () => {
    var newPosition = index.turn(currentPosition, 'LEFT');
    expect(newPosition.facing).to.equal('WEST');
  });
  
  it('turn NORTH RIGHT', () => {
    var newPosition = index.turn(currentPosition, 'RIGHT');
    expect(newPosition.facing).to.equal('EAST');
  });

});


describe('canMove', () => {

  it('NORTH edge', () => {
    var currentPosition = {
      x:0, y:0,
      facing: 'NORTH'
    }
    expect(index.canMove(currentPosition)).to.equal(false);
  });

  it('WEST edge', () => {
    var currentPosition = {
      x:0, y:0,
      facing: 'WEST'
    }
    expect(index.canMove(currentPosition)).to.equal(false);
  });

  it('SOUTH edge', () => {
    var currentPosition = {
      x:0, y:index.tableSize - 1,
      facing: 'WEST'
    }
    expect(index.canMove(currentPosition)).to.equal(false);
  });

  it('EAST edge', () => {
    var currentPosition = {
      x:index.tableSize - 1, y:0,
      facing: 'EAST'
    }
    expect(index.canMove(currentPosition)).to.equal(false);
  });

  it('(0,0,EAST)', () => {
    var currentPosition = {
      x:0, y:0,
      facing: 'EAST'
    }
    expect(index.canMove(currentPosition)).to.equal(true);
  });

  it('(0,0,SOUTH)', () => {
    var currentPosition = {
      x:0, y:0,
      facing: 'SOUTH'
    }
    expect(index.canMove(currentPosition)).to.equal(true);
  });
  

});

describe('place robot on the table', () => {
  var robot = index.robot;
  it('not on the table', () => {
    expect(robot.currentPosition).to.deep.equal({});
  });
  it('put on the table', () => {
    robot.place(0,0,'SOUTH')
    expect(robot.currentPosition.x).to.equal(0);
    expect(robot.currentPosition.y).to.equal(0);
    expect(robot.currentPosition.facing).to.equal('SOUTH');
  });
});

describe('robot is moving as expected', () => {
  var robot = index.robot;

  it('one step', () => {
    robot.place(0,0,'SOUTH')
    robot.move();
    expect(robot.currentPosition.x).to.equal(0);
    expect(robot.currentPosition.y).to.equal(1);
    expect(robot.currentPosition.facing).to.equal('SOUTH');
  });
});