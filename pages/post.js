import styles from '../styles/Post.module.css';
import "bootstrap/dist/css/bootstrap.css";
import React from 'react'

export default class OnePost extends React.Component{

    static async getInitialProps(context){
        const {query} = context
        const res_details = await fetch(`https://jsonplaceholder.typicode.com/posts/${query.id}`)
        const postDetails = await res_details.json()

        const res_comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${query.id}`)
        const postComments = await res_comments.json()

        return {postDetails: postDetails, postComments:postComments}
    }

    constructor(props){
        super(props)
        this.state = {
            post_details: this.props.postDetails,
            comments: this.props.postComments
        }
        this.searchForComment = this.searchForComment.bind(this)
    }

    //filtering function, triggered when the content of the search bar changes
    searchForComment = (e) =>{
        //normalize the input and the content in the json using .toLowerCase() then filter according to body email and name
        const filteredComments = this.state.comments.filter(com=>{
            return com.name.toLowerCase().includes(e.target.value.toLowerCase()) || com.email.toLowerCase().includes(e.target.value.toLowerCase()) || com.body.toLowerCase().includes(e.target.value.toLowerCase());
        })
        //if the search bar is empty then just return all comments else show the filtered comments
        if(e.target.value.length == 0){
            this.setState({comments:this.props.postComments})
        }
        else{
                this.setState({comments:filteredComments});
            }   
    }


    render(){
        return(
            <div className="container">
            <div className="row">
                <div className="col-12">
                <h1>Post Title: {this.state.post_details['title']}</h1>
                <h6><i>Posted by: {this.state.post_details['userId']}</i></h6>
                <hr/>
                <p>
                    {this.state.post_details['body']}
                </p>
                <div className="row">
                    <div className="col-12">
                        <h5>Users comment</h5>  
                        <input className="form-control" id="searchItem" placeholder="Search Comments..." onChange={this.searchForComment}></input>                         
                    </div>
                </div><hr/>
                {   //this will loop through the comments and show them one by one
                    Object.values(this.state.comments).map(function(d){
                    return(
                        <div id={d.id} key={d.id} className={styles.commentSection}>
                            <p className={styles.userDetails}>{d.name} ({d.email})</p>    
                            <p>{d.body}</p>
                        </div>
                    )
                    })
                }
                </div>
            </div>
        </div>
        )
    }
}