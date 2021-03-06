import characterReducer, { initialState } from './reducer';
import { addCharacter } from './actions';

export const validCharacter = {
  id: 0,
  slug: 'sonic',
  name: 'Sonic',
  color: '#0000ff',
  tier: 'S',
};


describe('character reducer', () => {
  it('should return the initial state if no state & action are provided', () => {
    expect(characterReducer()).to.deep.equal(initialState);
  });
  it('should return the same state if no action provided', () => {
    expect(characterReducer('CURRENT STATE')).to.equal('CURRENT STATE');
  });

  describe('has ADD_CHARACTER handler that', () => {
    it('returns a new character', () => {
      expect(
        characterReducer(undefined, addCharacter(validCharacter)),
      ).to.deep.equal({ ...initialState, ...validCharacter });
    });

    describe('throws error if', () => {
      it('state is not undefined', () => {
        expect(() => {
          characterReducer('UNEXPECTED STATE', addCharacter(validCharacter));
        }).to.throw();
      });
      it('character.id is not a number', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, id: 'asd' }));
        }).to.throw();
      });
      it('character.slug is not a string', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, slug: 7 }));
        }).to.throw();
      });
      it('character.name is not a string', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, name: 7 }));
        }).to.throw();
      });
      it('character.color is not a valid hex color string', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, color: 'asd' }));
        }).to.throw();
      });
      it('character.tier is not a string', () => {
        expect(() => {
          characterReducer(undefined, addCharacter({ ...validCharacter, tier: 7 }));
        }).to.throw();
      });
    });
  });
});
