import React from 'react';

class SavedPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem('user-jwt');
    fetch('/api/saved-posts', {
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
              <h2 className='roboto-7 margin-bottom-0'>Saved</h2>
            </div>
          </div>
          <div className='market-row'>
            {this.state.posts.map(
              post => {
                return (
                  <div className='column-half pd-7 mb-desktop mr-2rem-desktop' key={post.postId} >
                    <a href={`#posts?postId=${post.postId}`}>  <img src={post.imgUrl} className=' object-fit-market border-5' /></a>
                    <h4 className='margin-0 roboto-5 hide-mobile'>{post.title}</h4>
                    <h4 className='margin-0 raleway-400-price pt-8 hide-mobile'>${post.price}</h4>
                    <div className='column-100 relative hide-desktop'>
                      <div className='absolute-background'>
                        <h3 className='margin-0 text-align-center raleway-500-price'>${post.price}</h3>
                      </div>
                    </div>
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

export default SavedPosts;
