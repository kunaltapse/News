import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title, description,imageUrl, newsUrl,author, publishedAt} = this.props;
    return (
      <div>
          <div className="card">
  <img src={!imageUrl?"https://images.hindustantimes.com/img/2022/05/25/1600x900/60fd48ee-cefd-11ec-a18e-026abbb3bb32_1652034979593_1653460458703.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}...</h5>
    <p className="card-text">{description}...</p>
    <p class="card-text">Last updated by {!author?"unknown":author} on {publishedAt.slice(11,16)}</p>
    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem