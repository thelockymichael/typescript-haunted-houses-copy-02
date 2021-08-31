import firebase from 'firebase'

export interface CommentModel {
  id?: string
  username: string
  commentText: string
  createdAt?: firebase.firestore.Timestamp
  likes: number
  dislikes: number
  replies?: CommentModel[]
}
