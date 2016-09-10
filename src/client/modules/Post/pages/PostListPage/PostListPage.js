import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Import Components
import PostList from '../../components/PostList'
import PostCreate from '../../components/PostCreate/PostCreate'

// Import Actions
import { addPostRequest, fetchPosts, deletePostRequest } from '../../PostActions'
import { toggleAddPost } from '../../../App/AppActions'

// Import Selectors
import { getShowAddPost } from '../../../App/AppReducer'
import { getPosts } from '../../PostReducer'

class PostListPage extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  handleAddPost(name, title, content) {
    this.props.dispatch(toggleAddPost())
    this.props.dispatch(addPostRequest({ name, title, content }))
  }

  handleDeletePost(post) {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      this.props.dispatch(deletePostRequest(post))
    }
  }

  render() {
    return (
      <div>
        <PostCreate addPost={this.handleAddPost.bind(this)} showAddPost={this.props.showAddPost} />
        <PostList handleDeletePost={this.handleDeletePost.bind(this)} posts={this.props.posts} />
      </div>
    )
  }
}

PostListPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

// Actions required to provide data for this component to render in sever side.
PostListPage.need = [() => { return fetchPosts() }]

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddPost: getShowAddPost(state),
    posts: getPosts(state),
  }
}

export default connect(mapStateToProps)(PostListPage)