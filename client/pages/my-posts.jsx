import React from 'react';

class MyPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch('/api/my-posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Access-Token': token
      }
    })
      .then(result => result.json())
      .then(posts => {
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div>
        <div className='container'>
          <div className='modal-row border-bottom-2px'>
            <div className='column-80 margin-auto'>
              <h2 className='roboto-7 margin-bottom-0'>My Posts</h2>
            </div>
          </div>
          <div className='market-row justify-content-center mt-2rem pb-5rem'>
            {this.state.posts.map(
              post => {
                return (
                  <div className = ' pd-7 mb-desktop mr-2rem-desktop' key = { post.postId } >
                    <a href={`#posts?postId=${post.postId}`} className="card-anchor">  <img src={post.imgUrl} className=' object-fit-market' />
                      <div className="card">
                        <h4 className='margin-0 roboto-5 '>{post.title}</h4>
                        <h4 className='margin-0 raleway-400-price pt-8'>${post.price}</h4>

                      </div>
                    </a>
                  </div>
                );
              }
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default MyPosts;
