import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import "./homePage.scss";
import Star from "../../assests/star_white_24dp.svg";
import Header from '../header/header'
import UserAuth from '../UserAuth/UserAuth'
import { Snackbar, CircularProgress } from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import BookStoreService from "../services/book-serivce";

import { select } from "async";
import Footer from '../footer/footer'
import { withRouter } from "react-router-dom";

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

 class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookCount: '',
      bookData: [],
      pageNo: 0,
      snackbarOpen: false,
      snackbarmsg: '',
      isProgress: false,
      page:0,
      filters:'',
      bookDetail:[],
      pathName:'',
      passArray:[]
    }
    this.getBooksByNewArrival=this.getBooksByNewArrival.bind(this)
    this.getBooksByLowToHighPrice=this.getBooksByLowToHighPrice.bind(this)
    this.getBooksByHighToLowPrice=this.getBooksByHighToLowPrice.bind(this)
    this.handleChange=this.handleChange.bind(this)
    this.bookDetails=this.bookDetails.bind(this)
  }

  componentDidMount() {
    this.getBookCount();
    this.getBookData();
  }

  getBookCount = () => {
    new BookStoreService().getBooksCount().then(response => {
      let res = response.data
      this.setState({ bookCount: res.data })
      let pageNum = Math.ceil((this.state.bookCount) / 12 )
      this.setState({ pageNo: pageNum })
      // return pageNum
    })
  }

  getBookData = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    // let pageNumber=this.state.pageNo
    // console.log(pageNumber);
    new BookStoreService().getBooksFromDatabase((this.state.page)).then(response => {
      let res = response.data
      this.setState({ bookData: res.data })
      console.log(res);
    }).catch(err => {

    })
  }

  getBooksByLowToHighPrice = (event) => {
   
    // event.preventDefault();
    // event.stopPropagation();
    //this.setState({ isProgress: true })
    console.log("event")
    new BookStoreService().getBooksByLowToHighPrice((this.state.page)).then(response => {
      let res = response.data
      this.setState({ bookData: res.data })
      //console.log(res)
      this.setState({ isProgress: false })
    }).catch(err => {
      this.setState({ isProgress: false })
    })
  }

  getBooksByHighToLowPrice = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    //this.setState({ isProgress: true })
    console.log("event")
    new BookStoreService().getBooksByHighToLowPrice((this.state.page)).then(response => {
      let res = response.data
      this.setState({ bookData: res.data })
      //console.log(res)
      this.setState({ isProgress: false })
    }).catch(err => {
      this.setState({ isProgress: false })
    })
  }

  getBooksByNewArrival = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    //this.setState({ isProgress: true })
    console.log("event")
    new BookStoreService().getBooksByNewArrival((this.state.page)).then(response => {
      let res = response.data
      this.setState({ bookData: res.data })
      //console.log(res)
      this.setState({ isProgress: false })
    }).catch(err => {
      this.setState({ isProgress: false })
    })
  }

  getBookByFilter=(event)=>{
    console.log(event.target.value)
    if(event.target.value==="Price_Low_To_High"){
      this.getBooksByLowToHighPrice()
    }else if(event.target.value==="Price_High_To_Low"){
      this.getBooksByHighToLowPrice()
    }else if(event.target.value==="Newest_Arrivals"){
      this.getBooksByNewArrival()
    }else{
      this.getBookData();
    }
  }

  handleChange=(event,value)=>{
    this.setState({page: (value-1)}, () => {
      this.getBookData()
      //window.scrollTo(0, 0);
      // console.log(this.state.page)
  })
  }

  handleSearchData=(searchResponseData)=>{
    this.setState({bookData: searchResponseData})
  }
  
  bookDetails=(e)=>{
    // console.log("onclick",e.target.id)
    // console.log("this.state.bookData ",this.state.bookData)
    // let detail = this.state.bookData.find((elem) => e.target.id === elem.bookId);
    // this.setState({bookDetail : detail})
    // console.log("bookDetails",this.state.bookDetail)
    // console.log("event",e)
    this.props.history.push(`/bookdetails/${e}`)
  }

  render() {

    

    return (
      <React.Fragment>
        <Header handleSearchData={this.handleSearchData} pageNo={this.state.pageNo}/>

        <main className="homepage">

          <Container className="album-main">
            <div className="BooksHead">
              <div className="bookitems">
                <span className="bookheading">Books</span>
                <div className="bookcount">
                  <div className="count">({this.state.bookCount} Items)</div>
                </div>

              </div>
              <div className="booksort">
                <div className="sort" >
                  <select className="sortbox" onChange={this.getBookByFilter} >
                    <option selected value="default" >Sort by relevance</option>
                    <option value="Price_Low_To_High" >Price Low to high</option>
                    <option value="Price_High_To_Low" >price high to low</option>
                    <option value="Newest_Arrivals">Newest Arrivals</option>
                  </select>
                </div>
              </div>

            </div>

            <div className="box">
              <div className="boxinbox">
                <Grid className="Grid-Box" container spacing={4}>
                  {this.state.bookData.map((bookData) => (
                    <Grid className="Card-Box" item key={bookData.bookId} xs={3}>

                      <Card className>

                        <CardMedia className="book-img-bg"><img src={bookData.bookImage} id={bookData.bookId}
                         onClick={()=>this.bookDetails(bookData.bookId)} className="bookImage" /></CardMedia> 
                        <CardMedia className="book-img" />
                        <CardContent className="cardhome">
                          <Typography className="book-name">{bookData.bookName}</Typography>
                          <Typography>
                            <div className="book-auth">{bookData.bookAuthor}</div>
                            <div>
                              <Box display="flex" flexDirection="row">
                                <Box className="rate ">
                                  <Box className="rate-no">{bookData.rating}</Box>
                                  <img className="star" src={Star} />
                                </Box>
                                {/* <Box className="quant">{this.state.bookCount}</Box> */}
                              </Box>
                            </div>
                            <div>
                              <Box display="flex" flexDirection="row">
                                <Box className="price-new">Rs. {bookData.bookPrice}</Box>
                                <Box className="price-old">{bookData.bookOldPrice}</Box>
                              </Box>
                            </div>
                          </Typography>
                        </CardContent>
                        {/* <CardActions>
                        <Button className="quick-view">Quick View</Button>
                      </CardActions> */}

                      </Card>

                    </Grid>
                  ))}


                </Grid>

              </div>

            </div>



          </Container>

          <div >
            {/* <Pagination className="pageCounting"count={10} /> */}
            <Pagination color="red" className="pageCounting" count={this.state.pageNo} onChange={this.handleChange} color="secondary" />
            {/*<Pagination count={10} color="secondary" />
                <Pagination count={10} disabled /> */}
          </div>
          <div className="progressbar-container-logIn">{this.state.isProgress ? <CircularProgress color="white" className="progressBar progressbar" /> : ""
          }
          </div>
          <Footer />


        </main>

      </React.Fragment>

    );
  }
}
export default withRouter(Album);