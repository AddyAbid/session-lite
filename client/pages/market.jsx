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
        <div className='market-row'>
          {this.state.posts.map(
            post => {
              return (
          <div className='column-half pd-7 mb-desktop mr-2rem-desktop' key={post.postId}>
            <img src={post.imgUrl} className=' width-100 border-5' />
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
