exports.Post = class Post {
    constructor(title, auther, date, content, comments, id) {
        if(title) {
            if(!auther && !date && !content && !comments && !id) {
                this.convertObjToPost(title);
            } else {
                this.title = title;
                this.auther = auther;
                this.date = date;
                this.content = content;
                this.comments = comments;
                this.id = id;
            }
        }
    }
    convertObjToPost(obj){
        for(var prop in obj){
            this[prop] = obj[prop];
        }
    }
    isEqual(otherPost){
        // In the future we should implement it in a better way
        // console.log('isEqual', this.title, otherPost.title, this.content, otherPost.content, otherPost.comments.length);
        return (this.title === otherPost.title || this.content === otherPost.content) &&
            otherPost.comments.length > 0;
    }
}

