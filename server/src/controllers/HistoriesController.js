const {
  History,
  Song
} = require('../models');
const _ = require('lodash');

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id;
      // const { userId } = req.query;
      console.log('userId ', userId);
      console.log('userId ', userId);
      console.log('userId ', userId);
      const histories = await History.findAll({
        where: {
          UserId: userId
        },
        order: [
          ['createdAt', 'DESC']
        ],
        include: [ {
          model: Song
        } ]
      }).map(history => history.toJSON())
        .map(history => _.extend({}, {
          id: history.id,
          songId: history.Song.id,
          title: history.Song.title,
          artist: history.Song.artist,
          createdAt: history.createdAt
        }));
      res.send(_.uniqBy(histories, history => history.songId));
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the history.'
      });
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id;

      console.log('My userId: ', userId);

      const { songId } = req.body;
      console.log('My req.body: ', req.body);
      console.log('My req.body: ', req.body);
      console.log('My songId: ', songId);
      console.log('My songId: ', songId);
      // const history = await History.findOne({
      //   where: {
      //     SongId: songId,
      //     UserId: userId
      //   }
      // });
      // if (history) {
      //   return res.status(400).send({
      //     error: 'You already have this history record.'
      //   });
      // }
      // const history = await History.create(req.body);
      const history = await History.create({
        SongId: songId,
        UserId: userId
      });
      res.send(history);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the history record.'
      });
    }
  }
};
