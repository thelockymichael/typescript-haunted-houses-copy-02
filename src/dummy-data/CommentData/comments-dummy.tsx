import {CommentModel} from '../../redux/models'

import firebase from 'firebase'

const comments: CommentModel[] = [
  {
    id: '1',
    username: 'Miska',
    commentText: 'Nice hylätty talo',
    likes: 10,
    dislikes: 20,
  },
  {
    id: '2',
    username: 'Juha',
    commentText: 'Pelottaa',
    likes: 13,
    dislikes: 10,
  },
  {
    id: '3',
    username: 'Pete',
    commentText: 'Aikamoinen tutkintakohde',
    likes: 13,
    dislikes: 10,
  },
  {
    id: '4',
    username: 'Teuvo',
    commentText: 'Tämän takana on Matilainen',
    likes: 3,
    dislikes: 12,
  },
]

export {comments}
