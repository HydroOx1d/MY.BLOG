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
    const posts = await PostModel.find().populate('user').populate('comments.user').exec();

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
    }).populate('user').populate('comments.user')
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
        msg: "Статья удалена",
        data: {
          _id: doc._id
        }
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
      msg: "Статья обновлена",
      success: true
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось обновить статью",
      success: false
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

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findByIdAndUpdate({_id: postId}, {
      $push: {
        comments: {
          text: req.body.text,
          user: req.userId
        }
      }
    }, {
      returnDocument: 'after'
    }, (err, doc) => {
      if(err) {
        return res.status(500).json({
          msg: "Не удалось добавить комментарий",
          success: false
        })
      }

      if(!doc) {
        return res.status(404).json({
          msg: "Статья не найдена",
          success: false
        })
      }

      res.json({
        msg: "Комментарий добавлен",
        success: true,
        data: doc.comments
      })
    }).populate('user').populate('comments.user')
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: "Не удалось добавить комментарий"
    })
  }
}

export const getLastComments = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate("comments.user")
      .limit(2);
    const comments = posts.map(post => post.comments).flat().slice(0, 2)

    res.json(comments)
  } catch(err) {
    return res.status(500).json({
      msg: "Не удалось получить последние комментарии"
    })
  }
}

export const getPostsByTag = async (req, res) => {
  try {
    const tag = req.params.tagId
    const posts = await PostModel.find({tags: tag}).populate('user').populate('comments.user')

    if(posts.length <= 0) {
      return res.status(404).json({
        msg: "Постов не найдено"
      })
    }

    res.json(posts)
  } catch(err) {
    res.status(500).json({
      msg: "Не удалось получить посты по тэгу"
    })
  }
}