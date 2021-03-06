import appReducer, { initialState } from './reducer';
import { prevGame, nextGame } from './actions';
import { validGame, initGame } from '../game/reducer.test';
import { addGame, filterByName } from '../game/actions';
import { currentGameSelector } from './selectors';

const validApp = {
  title: 'Some App title',
  currentGameId: 11,
  currentFilter: '',
  games: [
    {
      id: 11,
      name: 'Melee',
      roster: [
        {
          id: 0,
          slug: 'young-link',
          name: 'Young Link',
          color: '#ffffff',
          tier: 'B',
        },
        {
          id: 1,
          slug: 'roy',
          name: 'Roy',
          color: '#ffffff',
          tier: 'S',
        },
      ],
    },
    {
      id: 15,
      name: 'Brawl',
      roster: [
        {
          id: 0,
          slug: 'sonic',
          name: 'Sonic',
          color: '#ffffff',
          tier: 'A',
        },
        {
          id: 1,
          slug: 'dk-kong',
          name: 'Dk. Kong',
          color: '#ffffff',
          tier: 'C',
        },
        {
          id: 2,
          slug: 'marth',
          name: 'Marth',
          color: '#ffffff',
          tier: 'A',
        },
      ],
    },
    {
      id: 2,
      name: 'Fake',
      roster: [
        {
          id: 0,
          slug: 'sonic',
          name: 'Sonic',
          color: '#ffffff',
          tier: 'A',
        },
      ],
    },
  ],
};


describe('app reducer', () => {
  it('should return the initial state if no state & action are provided', () => {
    expect(appReducer()).to.deep.equal(initialState);
  });
  it('should return the same state if no action provided', () => {
    expect(appReducer('CURRENT STATE')).to.equal('CURRENT STATE');
  });

  describe('has ADD_GAME handler that', () => {
    it('adds a new game when the list is empty', () => {
      expect(
        appReducer(undefined, addGame(validGame)),
      ).to.deep.equal({
        ...initialState,
        currentGameId: 0,
        games: [initGame(validGame)],
      });
    });
    it('adds a new game when app has some games already and currentGameId is set to it', () => {
      expect(
        appReducer(validApp, addGame(validGame)),
      ).to.deep.equal({
        ...validApp,
        currentGameId: 0,
        games: validApp.games.concat(initGame(validGame)),
      });
    });
  });

  // describe('has SELECT_GAME handler that');

  describe('has PREV_GAME handler that', () => {
    it('moves currentGameId to the previous game on the array', () => {
      const theCurrentOne = validApp.games[2];
      const thePreviousOne = validApp.games[1];
      expect(
        appReducer({ ...validApp, currentGameId: theCurrentOne.id }, prevGame()),
      ).to.have.property('currentGameId').that.equals(thePreviousOne.id);
    });
    it('moves currentGameId to the last game on the array when at the beginning', () => {
      const theFirstOne = validApp.games[0];
      const theLastOne = validApp.games[validApp.games.length - 1];
      expect(
        appReducer({ ...validApp, currentGameId: theFirstOne.id }, prevGame()),
      ).to.have.property('currentGameId').that.equals(theLastOne.id);
    });
  });

  describe('has NEXT_GAME handler that', () => {
    it('moves currentGameId to the next game on the array', () => {
      const theCurrentOne = validApp.games[1];
      const theNextOne = validApp.games[2];
      expect(
        appReducer({ ...validApp, currentGameId: theCurrentOne.id }, nextGame()),
      ).to.have.property('currentGameId').that.equals(theNextOne.id);
    });
    it('moves currentGameId to the first game on the array when at the end', () => {
      const theLastOne = validApp.games[validApp.games.length - 1];
      const theFirstOne = validApp.games[0];
      expect(
        appReducer({ ...validApp, currentGameId: theLastOne.id }, nextGame()),
      ).to.have.property('currentGameId').that.equals(theFirstOne.id);
    });
  });

  describe('has FILTER_BY_NAME handler that', () => {
    it('sets currentFilter to the search string', () => {
      expect(
        appReducer(validApp, filterByName('test')),
      ).to.have.property('currentFilter').that.equals('test');
    });
    it('updates currentGame\'s roster according to the applied filter', () => {
      const updatedState = appReducer({ ...validApp, currentGameId: 15 }, filterByName('on'));
      const currentGame = currentGameSelector(updatedState);
      expect(currentGame.roster.filter(c => c.visible)).to.have.lengthOf(2);
    });
  });
});
