export class Video {
  id:number;
  order:number;
  title:string;
  stars:string[];
  thumbnail:string;
  tags:string[];
  path:string;
  date:Date;

  constructor(
    id:number = -1,
    order:number = 0,
    title:string = '',
    stars:string[] = [],
    thumbnail:string = '',
    tags:string[] = [],
    path:string = '',
    date:Date = new Date()
  ) {
    this.id = id;
    this.order = order;
    this.title = title;
    this.stars = stars;
    this.thumbnail = thumbnail;
    this.tags = tags;
    this.path = path;
    this.date = date;
  }

  static toVideo(obj:any): Video {
    let video = new Video();
    for (let prop in obj) {
      // @ts-ignore
      video[prop as keyof Video] = JSON.parse(JSON.stringify(obj[prop]));
    }
    return video;
  }
}
