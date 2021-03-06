const expect = require('chai').expect;
const helper = require('../test-helper');

const indexPage = helper.indexPage;

describe('Index Controller - Default', () => {
  const expectedPlayer = 'MajorSlackmore';

  it('should display the message of the day', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.messageOfTheDay()).to.equal('A Minecraft Server');
      })
  );

  it('should display the correct server connection details', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.serverDetails()).to.equal('localhost:25565');
      })
  );

  it('should display the correct avatar', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.avatar(expectedPlayer)).to.equal('https://minotar.net/avatar/MajorSlackmore/100.png');
      })
  );

  it('should display the correct player name', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.player(expectedPlayer)).to.equal(expectedPlayer);
      })
  );

  it('should display the correct achievements', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.achievements(expectedPlayer)).to.contain('buildPickaxe');
        expect(indexPage.achievements(expectedPlayer)).to.contain('openInventory');
        expect(indexPage.achievements(expectedPlayer)).to.contain('buildWorkBench');
        expect(indexPage.achievements(expectedPlayer)).to.contain('mineWood');
        expect(indexPage.achievements(expectedPlayer)).to.contain('exploreAllBiomes');
      })
  );

  it('should display the correct score', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.score(expectedPlayer)).to.equal('50');
      })
  );

  it('should display the players in the correct order', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.playerInPosition(0)).to.equal('MajorSlackmore');
        expect(indexPage.playerInPosition(1)).to.equal('MiniSlackmore');
      })
  );
});

describe('Index Controller Stats Only - Default', () => {
  const expectedPlayer = 'MajorSlackmore';

  it('should display the correct avatar', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.avatar(expectedPlayer)).to.equal('https://minotar.net/avatar/MajorSlackmore/100.png');
      })
  );

  it('should display the correct player name', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.player(expectedPlayer)).to.equal(expectedPlayer);
      })
  );

  it('should display the correct achievements', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.achievements(expectedPlayer)).to.contain('buildPickaxe');
        expect(indexPage.achievements(expectedPlayer)).to.contain('openInventory');
        expect(indexPage.achievements(expectedPlayer)).to.contain('buildWorkBench');
        expect(indexPage.achievements(expectedPlayer)).to.contain('mineWood');
        expect(indexPage.achievements(expectedPlayer)).to.contain('exploreAllBiomes');
      })
  );

  it('should display the correct score', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.score(expectedPlayer)).to.equal('50');
      })
  );

  it('should display the players in the correct order', () =>
    indexPage.visitStats()
      .then(() => {
        expect(indexPage.playerInPosition(0)).to.equal('MajorSlackmore');
        expect(indexPage.playerInPosition(1)).to.equal('MiniSlackmore');
      })
  );
});

describe('Index Controller - NoPlayers', () => {
  it('should display Waiting if no players are found', () =>
    indexPage.visit()
      .then(() =>
        expect(indexPage.amWaitingForPlayers()))
  );
});

describe('Index Controller - NoCache', () => {
  it('should still display all players if cache is wrong', () =>
    indexPage.visit()
      .then(() =>
        expect(indexPage.noOfPlayersShown(2)))
  );

  it('should display the correct avatar', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.avatar('MajorSlackmore')).to.equal('https://minotar.net/avatar/MajorSlackmore/100.png');
      })
  );
});

describe('Index Controller - NoInternet', () => {
  it('should display the default player name', () =>
    indexPage.visit()
      .then(() => {
        expect(indexPage.player('6eb35f96')).to.equal('6eb35f96');
      })
  );
});

