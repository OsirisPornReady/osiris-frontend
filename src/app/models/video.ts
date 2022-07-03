export class Video {
  title:string
  actor:string[]
  thumbnail:string
  tags:string[]
  path:string

  constructor(
    title:string = '',
    actor:string[] = [],
    thumbnail:string = '',
    tags:string[] = [],
    path:string = '',
  ) {
    this.title = title;
    this.actor = actor;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.path = path;
  }
}
