export interface FilmType {
  backgroundColor: string,
  backgroundImage: string,
  description: string,
  director: string,
  genre: string,
  id: number,
  isFavorite: boolean,
  name: string,
  posterImage: string,
  previewImage: string,
  previewVideoLink: string,
  rating: number,
  released: number,
  runTime: number,
  scoresCount: number,
  starring: string[],
  videoLink: string
}

export type FilmsType = FilmType[]

export interface CommentType {
  id: number,
  user: {
    id: number,
    name: string
  },
  rating: number,
  comment: string,
  date: string
}

export type CommentsType = CommentType[]
export type State = any[] | boolean | number | object | string
export type Action = `PUSH` | `REPLACE` | `POP`

export interface LocationType {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: State
}

export interface HistoryType {
  action: Action
  block: () => void,
  canGo: () => void,
  createHref: () => void,
  entries: LocationType[],
  go: () => void,
  goBack: () => void,
  goForward: () => void,
  index: number,
  length: number,
  listen: () => void,
  location: LocationType,
  push: (path: string) => void,
  replace: () => void
}

export interface MatchType {
  isExact: boolean,
  params: {
    [key: string]: any
  },
  path: string,
  url: string
}

export interface UserType {
  id: number,
  email: string,
  name: string,
  avatarUrl: string
}
