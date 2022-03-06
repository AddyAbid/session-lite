import React from 'react';

class MarketPlace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/sessions')
      .then(response => response.json())
      .then(postCards => {
        this.setState({ posts: postCards });
      });
  }

  render() {
    return (
      <div className='container'>
        {
          this.state.posts.length === 0 &&
          <h2 className='font-20px margin-top-15 roboto-medium modal-row justify-content-center'>Sorry, there are currently no sessions to browse ):</h2>
        }
        <div className='marketplace-row justify-content-center mt-2rem'>
          {this.state.posts.map(
            post => {
              return (
          <div className=' pd-7 mb-desktop mr-2rem-desktop mb-75px' key={post.postId} >
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

    );
  }
}

export default MarketPlace;
