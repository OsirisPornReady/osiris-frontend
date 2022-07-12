export class Video {
  title:string
  stars:string[]
  thumbnail:string
  tags:string[]
  path:string

  constructor(
    title:string = '',
    stars:string[] = [],
    thumbnail:string = '',
    tags:string[] = [],
    path:string = '',
  ) {
    this.title = title;
    this.stars = stars;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.path = path;
  }
}
