const jsonFile = require('jsonfile-promised');
const readfiles = require('node-readfiles');
const logger = require('winston');
const fs = require('fs');
const rp = require('request-promise');
const HTMLParser = require('fast-html-parser');

const points = require('../assets/json/points.json');

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getNameFromExternal"] }] */

module.exports = class UserHelper {

  constructor(serverPath, levelName) {
    this.serverPath = serverPath;
    this.levelName = levelName;
  }

  static filterAchievements(stats) {
    return Object.keys(stats)
      .filter(x => x.indexOf('achievement') === 0)
      .map(y => y.substring('achievement.'.length));
  }

  static calcScore(achievementList) {
    return achievementList
      .map(x => points[`achievement.${x}`])
      .reduce((prev, curr) => prev + curr);
  }

  getNameFromExternal(userId) {
    logger.log('info', `Attempting to lookup name via https://namemc.com/profile/${userId}`);

    return rp(`https://namemc.com/profile/${userId}`).then((result) => {
      const root = HTMLParser.parse(result);
      const name = root.querySelector('.minecraft-name').text;

      logger.log('info', `${userId} >> ${name}`);

      return name;
    })
      .catch(() => {
        logger.log('info', `Unable to get name externally.. using ${userId} instead.`);
        return 'UNKNOWN';
      });
  }

  getDetails() {
    const userDataFile = `${this.serverPath}/usercache.json`;

    return jsonFile.readFile(userDataFile).then(result =>
      result.map(entry => ({ uuid: entry.uuid, name: entry.name })))
      .catch(e => logger.log('error', e));
  }

  getName(userId) {
    return this.getDetails().then((details) => {
      const userDetail = details.filter(user => user.uuid === userId)[0];
      return userDetail ? userDetail.name : this.getNameFromExternal(userId);
    });
  }

  getAchievements(userId) {
    const statsDataFile =
      `${this.serverPath}/${this.levelName}/stats/${userId}.json`;

    return jsonFile.readFile(statsDataFile).then((result) => {
      const achievements = UserHelper.filterAchievements(result);
      const score = UserHelper.calcScore(achievements);

      return Object.assign({ userId, achievements, score });
    })
      .catch(e => logger.log('error', e));
  }

  getAllAchievements() {
    const achievementPromiseArray = [];
    const statsDirectory = `${this.serverPath}/${this.levelName}/stats/`;

    if (fs.existsSync(statsDirectory)) {
      return readfiles(statsDirectory).then((filenameList) => {
        const userIds = filenameList.map(filename => filename.replace('.json', ''));

        userIds.forEach((userId) => {
          achievementPromiseArray.push(this.getAchievements(userId));
        });

        return Promise.all(achievementPromiseArray).then(result =>
          result.sort((a, b) => b.score - a.score));
      })
        .catch(e => logger.log('error', e));
    }
    return new Promise(resolve => resolve([]));
  }
};
