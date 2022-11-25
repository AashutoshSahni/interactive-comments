import React, { useState } from 'react';

export default function NewComment({display, setComments, parentId}) {
  const [values, setValues] = useState({ userName: '', imageUrl: '', content: ''});

  function submitComment(values) {
    const allComments = JSON.parse(localStorage.getItem('COMMENTS_DATA') || "[]");
    const comment = {
      id: allComments.length,
      userName: values.userName,
      imageUrl: values.imageUrl,
      content: values.content,
      upVotes: 0,
      replies: []
    }
    allComments.push(comment);
    setComments(allComments);
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setValues({ userName: '', imageUrl: '', content: ''});
  }

  function submitReply(parentId, values) {
    const allComments = JSON.parse(localStorage.getItem('COMMENTS_DATA'));
    const index = allComments.findIndex(comment => comment.id === parentId);
    const comment = allComments[index];
    const replies = comment.replies;
    const reply = {
      id: replies.length,
      userName: values.userName,
      imageUrl: values.imageUrl,
      content: values.content,
      upVotes: 0,
    }
    comment.replies.push(reply);
    allComments[index] = comment;
    setComments(allComments);
    localStorage.setItem('COMMENTS_DATA', JSON.stringify(allComments));
    setValues({ userName: '', imageUrl: '', content: ''});
  }

  function handleChange(event){
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  
  return (
    display && (
    <div className="comment-box-main-container">
      <div className="comment-box-main-section">
        <div className="new-comment-box-user-comment-infomation-container">
          <div className="new-comment-box-user-comment-information">
            <div>
              <input className="new-comment-box-user-name" required placeholder="Name" value={values.userName} name='userName' onChange={handleChange}></input>
            </div>
            <div>
              <input className="new-comment-box-user-name" placeholder="Image URL" value={values.imageUrl} name='imageUrl' onChange={handleChange}></input>
            </div>
            <div>
              <textarea className="new-comment-box-user-comment" required value={values.content} name='content' onChange={handleChange}></textarea>
            </div>
          </div>
          <div className='button-container'>
              <button className="post-button" onClick={() => (parentId === undefined ? submitComment(values) : submitReply(parentId, values) )}>
                { parentId === undefined ? "Post New Comment": "Post New Reply" }
              </button>
          </div>
        </div>
      </div>
    </div>
    )
  )
}