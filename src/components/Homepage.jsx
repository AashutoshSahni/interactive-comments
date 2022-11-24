import React, { useState }  from 'react';
import CommentBox from './CommentBox';
import '../App.css';

export default function Homepage() {
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('COMMENTS_DATA') || "[]"));
  
  function getComments() {
    const allComments = JSON.parse(localStorage.getItem('COMMENTS_DATA'));
    return allComments
  }

  function handleUpVotes(id) {
    const allComments = getComments();
    const index = allComments.findIndex(comment => comment.id === id);
    const comment = allComments[index];
    comment.upVotes += 1;
    allComments[index] = comment;
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setComments(allComments);
  }

  function handleReplyUpVotes(replyId,commentId) {
    const allComments = getComments();
    const parentIndex = allComments.findIndex(comment => comment.id === commentId);
    const comment = allComments[parentIndex];
    const replies = comment.replies;
    const replyIndex = replies.findIndex(reply => reply.id === replyId);
    const reply = replies[replyIndex];
    reply.upVotes += 1;
    comment.replies[replyIndex] = reply; 
    allComments[parentIndex] = comment;
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setComments(allComments);
  }

  function deleteComment(id) {
    const allComments = getComments();
    const index = allComments.findIndex(comment => comment.id === id);
    const filteredComments = allComments.slice(0, index).concat(allComments.slice(index + 1));
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(filteredComments));
    setComments(filteredComments);
  }

  function deleteReply(replyId, commentId) {
    const allComments = getComments();
    const parentIndex = allComments.findIndex(comment => comment.id === commentId);
    const comment = allComments[parentIndex];
    const replies = comment.replies;
    const replyIndex = replies.findIndex(reply => reply.id === replyId);
    comment.replies = replies.slice(0, replyIndex).concat(replies.slice(replyIndex + 1));
    allComments[parentIndex] = comment;
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setComments(allComments);
  }

  function updateCommentContent(id, content) {
    const allComments = getComments();
    const index = allComments.findIndex(comment => comment.id === id);
    const comment = allComments[index];
    comment.content = content;
    allComments[index] = comment;
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setComments(allComments);
  }

  function updateReplyContent(replyId, commentId, content) {
    const allComments = getComments();
    const parentIndex = allComments.findIndex(comment => comment.id === commentId);
    const comment = allComments[parentIndex];
    const replies = comment.replies;
    const replyIndex = replies.findIndex(reply => reply.id === replyId);
    const reply = replies[replyIndex];
    reply.content = content;
    replies[replyIndex] = reply;
    comment.replies = replies;
    allComments[parentIndex] = comment;
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setComments(allComments);
  }

  return(
    <div className='home-page'>
      <div style={{fontSize: '30px', marginBottom: '40px'}}>
        Interactive Comment Section
      </div>
      <div style={{marginLeft: '40px'}}>
        <CommentBox
          action='create'
          display={true}
          setComments={setComments}
        />
      </div>
      {(comments || []).map(comment => (
        <CommentBox
          comment={comment}
          action='display'
          display={true}
          key={comment.id}
          id={comment.id}
          handleUpVotes={handleUpVotes}
          handleReplyUpVotes={handleReplyUpVotes}
          setComments={setComments}
          deleteComment={deleteComment}
          deleteReply={deleteReply}
          updateCommentContent={updateCommentContent}
          updateReplyContent={updateReplyContent}
        />
      ))}
    </div>
  )
}