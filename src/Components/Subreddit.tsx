import React, { useState } from 'react';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import InfiniteScroll from 'react-infinite-scroller';

import './Subreddit.scss';

const Subreddit = (props: any) => {
  const data = props.data?.children || [];
  const [subRedditPostsState, setSubRedditPosts] = useState([]);
  const [subRedditResponse, setSubRedditResponse] = useState(props.data);
  const subredditName: string = data.length ? data[0].data.subreddit_name_prefixed : '';

  const checkForExtension = (url: string) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  const getSubRedditPosts = (children) => {
    const subRedditPosts = [];
    children.forEach((post) => {
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
  
  const fetchMore = () => {
    fetch(`https://www.reddit.com/${subredditName}/new.json?limit=50&after=${subRedditResponse?.data?.after || props?.data?.after || ''}.json`)
    .then(response => response.json())
    .then(body => {
      setSubRedditPosts([...subRedditPostsState, getSubRedditPosts(body.data?.children)]);
      setSubRedditResponse(body.data);
    })
    .catch(error => {
      return error;
    });
  }

  const subRedditPosts = getSubRedditPosts(data);
  return (
    <>
      <Header className='SubredditHeader' description={subredditName} >
        <div className='title'>{data.length ? data[0].data.subreddit : undefined}</div>
      </Header>
      <div className="overflow">
        <InfiniteScroll
          className="InfiniteScroll"
          pageStart={0}
          loadMore={fetchMore}
          hasMore={true}
          initialLoad={false}
          useWindow={true}
        >
        <Container className='SubredditContainer'>
            {subRedditPosts}
            {subRedditPostsState}
          </Container>
          </InfiniteScroll>
      </div>
    </>
  );
}

export default Subreddit;