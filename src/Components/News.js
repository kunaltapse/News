import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'

export class News extends Component {
 static defaultProps = {
   country: 'in',
   pageSize: 8,
   category: 'general',
 }
 

 static propTypes = {
   country: propTypes.string,
   pageSize: propTypes.number,
   category: propTypes.string,
 }
 capitalizeFirstLetter =(string)=> {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props){
    super(props);
    this.state =  {
      articles: [],
      loading: false,
      page:1
    }
    document.title = `News-${this.capitalizeFirstLetter(this.props.category)}`;

  }
  
   async UpdateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f35e7b067c05428b91ce13c84d92bcf1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false})
   }
   async componentDidMount()  {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f35e7b067c05428b91ce13c84d92bcf1&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false})

  }
  handlePrev = async ()=>{

    /*let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f35e7b067c05428b91ce13c84d92bcf1&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })
    */
    this.setState({page: this.state.page - 1})
    this.UpdateNews();


  }
  handleNext = async ()=>{
    
    /*console.log("next");

    if(!(this.state.page + 1>Math.ceil(this.state.totalResults/(this.props.pageSize)))){

    
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f35e7b067c05428b91ce13c84d92bcf1&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles,
      loading: false
    })
  }*/
  this.setState({page: this.state.page+1})
  this.UpdateNews()
  }
  render() {
    return (
      <div className="container my-3">
          <h1 className='text-center' style={{margin: '40px 0px'}}>NewsApp- top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
          {this.state.loading &&<Spinner/>}
          <div className="row">
          { !this.state.loading && this.state.articles.map((element)=>{
             return <div className="col-md-4" key={element.url}>
             <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} publishedAt={element.publishedAt}/>
             </div>
          })}     
          </div>
          <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} onClick={this.handlePrev} className="btn btn-primary">&larr; Previous</button>
          <button type="button" disabled={(this.state.page + 1>Math.ceil(this.state.totalResults/(this.props.pageSize)))} onClick={this.handleNext} className="btn btn-primary">Next &rarr;</button>
          </div>
          
      </div>
      
    )
  }
}

export default News