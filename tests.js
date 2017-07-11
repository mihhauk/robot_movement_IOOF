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