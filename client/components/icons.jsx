import React from 'react';

function Icons(props) {
  return (
      <div className='row hide-desktop absolute-bottom-icons margin-0 text-align-center'>
        <div className='column-fifth'>
          <a href='#marketplace'>
          <i className={props.route.path === 'marketplace' || props.route.path === 'posts' ? 'fas fa-store-alt fa-2x orange' : 'fas fa-store-alt fa-2x '} id='1'></i>
          </a>
        </div>
        <div className='column-fifth'>
          <a href='#inbox'>
          <i className={props.route.path === 'inbox' || props.route.path === 'thread' ? 'far fa-comment fa-2x orange' : 'far fa-comment fa-2x'}></i>
          </a>
        </div>
        <div className='column-fifth'>
          <a href='#form'>
            <i className={props.route.path === 'form' ? 'far fa-edit fa-2x orange' : 'far fa-edit fa-2x '} id='3'></i>
          </a>
        </div>
        <div className='column-fifth'>
          <a href='#account'>
           <i className={props.route.path === 'account' ? 'fas fa-user fa-2x orange' : 'fas fa-user fa-2x'}></i>
          </a>
        </div>
        <div className='column-fifth'>
          <a href='#saved'>
            <i className={props.route.path === 'saved' ? 'far fa-heart fa-2x orange' : 'far fa-heart fa-2x'}></i>
          </a>
        </div>
      </div>
  );
}

export default Icons;
