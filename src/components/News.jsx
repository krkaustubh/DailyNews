/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    setLoading(true)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(69);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - DailyNews`;
    updateNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
  }


  // console.log("render");
  return (
    <>
      <h1 className='text-center' style={{ margin: '35px 0px', marginTop: '90px' }}>DailyNews - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {/* {loading && <Spinner/>} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}

        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen it all</b>
          </p>
        }
      >
        <div className="container">
          <div className='row'>
            {articles.map((element) => {
              return <div className='col-md-4' key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} date={new Date(element.publishedAt).toLocaleDateString("en-GB")} author={element.author ? element.author : "Unknown"} source={element.source.name} />
              </div>
            })}
          </div>
        </div>

      </InfiniteScroll>

    </>
  )

}

News.defaultProps = {
  country: 'in',
  pageSize: 9,
  category: 'general'
}

News.propTypes = {
  // setProgress: PropTypes,
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired
}

export default News
