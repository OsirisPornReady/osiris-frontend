export class Video {
  title:string;
  stars:string[];
  thumbnail:string;
  tags:string[];
  path:string;
  date:Date;

  constructor(
    title:string = '',
    stars:string[] = [],
    thumbnail:string = '',
    tags:string[] = [],
    path:string = '',
    date:Date = new Date()
  ) {
    this.title = title;
    this.stars = stars;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.path = path;
    this.date = date;
  }
}
