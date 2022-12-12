import PostModel from '../models/Post.js'

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    })

    const post = await doc.save()

    res.json(post)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось создать статью"
    })
  }
}

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('user').exec();

    res.json(posts)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось получить статьи!"
    })
  }
}


export const getOne = (req, res) => {
  try {
    const postId = req.params.id;
    
    PostModel.findOneAndUpdate({
      _id: postId
    }, {
      $inc: {viewsCount: 1}
    }, {
      returnDocument: "after"
    }, (err, doc) => {
      if(err) {
        return res.status(404).json({
          msg: "Ошибка, попробуйте позже"
        })
      }

      if(!doc) {
        return res.status(404).json({
          msg: "Не удалось найти статью"
        })
      }

      res.json(doc)
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось получить статью"
    })
  }
}

export const remove = (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndDelete({
      _id: postId
    }, (err, doc) => {
      if(err) {
        return res.status(500).json({
          msg: "Не удалось удалить статью"
        })
      }

      if(!doc) {
        return res.status(404).json({
          msg: "статья не найдена"
        })
      } 

      res.json({
        msg: "Статья удалена"
      })
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось удалить статью"
    })
  }
}

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne({
      _id: postId,
    }, {
      title: req.body.title,
      text: req.body.text,
      tags: req.body.tags,
      imageUrl: req.body.imageUrl,
      user: req.userId
    })

    res.json({
      msg: "Статья обновлена"
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось обновить статью"
    })
  }
}


export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(3)
    
    const tags = posts.map(post => post.tags).flat().slice(0, 5)

    res.json(tags)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось получить тэги"
    })
  }
}