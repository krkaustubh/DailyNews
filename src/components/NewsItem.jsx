import React from 'react'
import PropTypes from 'prop-types'


const NewsItem = (props)=> {
    let {title, description, imageUrl, newsUrl, date, author, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
        <span className="position-absolute top translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:'2'}}>{source}</span>
          <img src={!imageUrl?"https://t3.ftcdn.net/jpg/04/32/96/66/360_F_432966637_k3IxbtJO6MIO1ld9skwaLet0F5OMAMbk.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className="text-muted">By {author} on {date}</small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
}
NewsItem.propTypes={
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  source: PropTypes.string
}
export default NewsItem
