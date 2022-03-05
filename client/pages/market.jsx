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
        <div className='marketplace-row justify-content-center'>
          {this.state.posts.map(
            post => {
              return (
          <div className=' pd-7 mb-desktop mr-2rem-desktop' key={post.postId} >
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

    );
  }
}

export default MarketPlace;
