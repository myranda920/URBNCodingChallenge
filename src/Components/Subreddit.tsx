import * as React from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';

import './Subreddit.scss';

const Subreddit = (props: any) => {
  const { data } = props;

  const checkForExtension = (url: string) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  const getsubRedditPosts = () => {
    const subRedditPosts = [];
    props.data.forEach((post) => {
      const { url, title, author, selftext } :
      { url: string, title: string, author: string, selftext: string } = post.data;
      let media;
      
      if (data.secure_media?.type === 'youtube.com') {
        media = (<iframe className='video'src={url.replace('watch?v=','embed/')}></iframe>)
      } else if (checkForExtension(url)) {
        media = (<img className='image' src={url}></img>);
      }

      subRedditPosts.push(
        <Container
          className='subRedditPostContainer'
            header={
              <Header
                variant='h3'
                description=''
                className='Post'
              >
               <h4 className='author'>{author}</h4>
              </Header>
            }
          >
            <div className='block'>
              <h2>{title}</h2>
              <p>{selftext}</p>
              {media}
            </div>
          </Container>
        )
    })

    return subRedditPosts
  }
  
  const subRedditPosts = getsubRedditPosts();
  return (
    <>
    <Header className='SubredditHeader' description={data.length ? data[0].data.subreddit_name_prefixed : ''} >
      <div className='title'>{data.length ? data[0].data.subreddit : undefined}</div>
    </Header>
      <Container className='SubredditContainer'>
        {subRedditPosts}
      </Container>
    </>
  );
  }

export default Subreddit;