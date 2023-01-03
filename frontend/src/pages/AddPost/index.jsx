import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';
import { useParams } from 'react-router-dom'

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadFile, createPost, getFullPost, updatePost} from '../../api';


export const AddPost = () => {
  const {data} = useSelector(state => state.auth)
  const navigate = useNavigate()

  if(!data) {
    navigate('/')
  }
  
  const { id } = useParams()

  const isEditing = Boolean(id)

  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('')
  const [tags, setTags] = React.useState('')
  const [imageUrl, setImageUrl] = React.useState('')

  const inputFileRef = React.useRef()

  React.useEffect(() => {
    if(isEditing) {
      getFullPost(id).then(data => {
        setTitle(data.title)
        setText(data.text)
        setTags(data.tags.join(','))
        setImageUrl(data.imageUrl)
      })
    }
  }, [])

  const handleChangeFile = async (e) => {
    try {
      const file = e.target.files[0] 
      const formData = new FormData()
      formData.append('image', file)

      const url = await uploadFile(formData)
      
      setImageUrl(url.url)
    } catch (err) {
      alert('Не удалось загрузить картинку')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('')
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const createUpdateArticle = async () => {
    try {
        const creatingOptions = {
        title: title,
        text: text,
        tags: tags.split(','),
        imageUrl: imageUrl,
      }

      let newPost;

      if(isEditing) {
        newPost = await updatePost(id, creatingOptions)
      } else {
        newPost = await createPost(creatingOptions)
      }

      const _id = isEditing ? id : newPost._id 
    
      navigate('/posts/' + _id)
    } catch (err) {
      if(isEditing) {
        alert('Не удалось обновить статью')
      } else {
        alert('Не удалось создать статью')
      }
      console.log(err)
    }
  }

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={`http://localhost:8080${imageUrl}`} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField 
        classes={{ root: styles.tags }} 
        variant="standard" 
        placeholder="Тэги" 
        fullWidth 
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={createUpdateArticle}>
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
