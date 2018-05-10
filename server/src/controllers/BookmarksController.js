const {
  Bookmark,
  Song
} = require('../models');
const _ = require('lodash');

module.exports = {
  async index (req, res) {
    try {
      const userId = req.user.id;
      // const { userId } = req.query;
      const { songId } = req.query;
      const where = {
        UserId: userId
      };
      if (songId) {
        where.SongId = songId;
      };
      const bookmarks = await Bookmark.findAll({
        where: where,
        include: [ {
          model: Song
        } ]
      }).map(bookmark => bookmark.toJSON())
        .map(bookmark => _.extend({}, {
          id: bookmark.id,
          songId: bookmark.Song.id,
          title: bookmark.Song.title,
          artist: bookmark.Song.artist,
          createdAt: bookmark.createdAt
        }));
      res.send(bookmarks);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to fetch the bookmark.'
      });
    }
  },
  async post (req, res) {
    try {
      const userId = req.user.id;
      const {songId} = req.body;
      console.log(req.body);
      console.log(req.body);
      console.log(songId);
      console.log(songId);
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId,
          UserId: userId
        }
      });
      if (bookmark) {
        return res.status(400).send({
          error: 'You already have this set as a bookmark.'
        });
      }
      const newBookmark = await Bookmark.create({
        SongId: songId,
        UserId: userId
      });
      res.send(newBookmark);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to create the bookmark.'
      });
    }
  },
  async delete (req, res) {
    try {
      const userId = req.user.id;
      const {bookmarkId} = req.params;
      const bookmark = await Bookmark.findOne({
        where: {
          id: bookmarkId,
          UserId: userId
        }
      });
      if (!bookmark) {
        res.status(403).send({
          error: 'You do not have access to this bookmark'
        });
      }
      await bookmark.destroy();
      res.send(bookmark);
    } catch (err) {
      res.status(500).send({
        error: 'An error has occured trying to delete the bookmark.'
      });
    }
  }
};
