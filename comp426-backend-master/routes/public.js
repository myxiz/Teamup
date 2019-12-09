import express from "express";
import {parseGet} from "../middlewares/parse_get";
import {parsePost} from "../middlewares/parse_post";
import {parseDelete} from "../middlewares/parse_delete";

export const router = express.Router();
export const prefix = '/public';

var id = 0;

const {publicStore} = require('../data/DataStore');



router.post('/wallposts', async function (req, res) {
  const body = req.body.body;
  publicStore.set(`posts.${id}`, {
    data: { text: body,
      date: Date.now(),
       }
  });
  res.send({data: publicStore.get(`posts.${id++}`), status: 'Successfully posted'});
});




router.get('/*', parseGet, function (req, res) {
  const result = req.handleGet(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.post('/*', parsePost, function (req, res) {
  const result = req.handlePost(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});

router.delete('/*', parseDelete, function (req, res) {
  const result = req.handleDelete(publicStore);
  if (typeof result !== 'undefined') {
    res.send({result})
  }
});
