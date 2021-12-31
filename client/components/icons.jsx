import React from 'react';

function Icons(props) {
  return (
      <div className='row hide-desktop absolute-bottom-icons margin-0 text-align-center'>
        <div className='column-fifth'>
          <a href='#marketplace'>
          <i className={props.route.path === 'marketplace' ? 'fas fa-store-alt fa-2x orange' : 'fas fa-store-alt fa-2x '} id='1'></i>
          </a>
        </div>
        <div className='column-fifth'>
          <a href='#inbox'>
            <i className={props.route.path === 'inbox' ? 'far fa-comment fa-2x orange' : 'far fa-comment fa-2x'}></i>
          </a>
        </div>
        <div className='column-fifth'>
          <a href='#form'>
            <i className={props.route.path === 'form' ? 'far fa-edit fa-2x orange' : 'far fa-edit fa-2x '} id='3'></i>
          </a>
        </div>
        <div className='column-fifth'>
          <i className="fas fa-user fa-2x"></i>
        </div>
        <div className='column-fifth'>
          <i className="far fa-heart fa-2x"></i>
        </div>
      </div>
  );
}

export default Icons;
