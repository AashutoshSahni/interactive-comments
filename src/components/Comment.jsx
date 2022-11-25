import React, { useState } from 'react';

export default function Comment({
  type,
  comment,
  id,
  parentId,
  handleUpVotes,
  handleReplyUpVotes,
  showReplies,
  setShowReplies,
  deleteComment,
  deleteReply,
  updateCommentContent,
  updateReplyContent
}){
const [isEditing, setIsEditing] = useState(false);
const [commentContent, setCommentContent] = useState(comment.content || '');

function handleContentUpdate() {
  setIsEditing(false);
  if(type === 'comment') {
    console.log(id);
    console.log(parentId);
    updateCommentContent(id, commentContent);
  }else {
    updateReplyContent(id, parentId, commentContent);
  }
}

return(
<div className="comment-box-main-container" >
  <div className="comment-box-main-section">
    <div className="comment-box-user-profile-image">
      <img src={comment.imageUrl} alt=""/>
    </div>
    <div className="comment-box-user-comment-infomation-container">
      <div style={{display:'flex'}}>
      <div className={type === 'comment' ? 'comment-box-user-comment-infomation comment-specific' : 'comment-box-user-comment-infomation reply-specific'}>
        <div className="comment-box-user-name">
          { comment.userName }
        </div>
        <div style={{display: 'flex'}}>
          <div className="comment-box-user-comment">
            { isEditing ?
              <textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea> : 
              <p>{comment.content}</p> 
            }
          </div>
          <div className="comment-box-user-comment">
            { isEditing &&
              <button onClick={handleContentUpdate}>Update</button>
            }
          </div>
        </div>
      </div>
      <div className="delete-container">
        <img
          className='delete-comment'
          src="https://www.pngfind.com/pngs/m/47-471196_icon-trash-png-font-awesome-trash-o-transparent.png"
          alt=""
          onClick={() => (type === 'comment' ? deleteComment(id) : deleteReply(id, parentId))}/>
      </div>
      </div>
        <div className="comment-box-user-likes-reply-section-container">
          <div className="comment-box-user-likes-section">
            <div className="comments-user-like-image">
              <img
                src="https://cdn-icons-png.flaticon.com/512/59/59124.png"
                alt=""
                onClick={() => (type === 'comment' ? handleUpVotes(id) : handleReplyUpVotes(id, parentId))}/>
            </div>
            <div className="comment-user-likes-count">
              <p>{comment.upVotes}</p>
            </div>
          </div>
          { type === 'comment' &&
            <div className="comment-box-user-comment-reply-container" onClick={() => setShowReplies(!showReplies)}>
              <div className="comment-box-user-comment-reply-image">
                <img src="https://www.pngfind.com/pngs/m/230-2309372_png-file-svg-scalable-vector-graphics-transparent-png.png" alt=""/>
              </div>
              <div className="comment-box-user-comment-reply-text">
                <p>Reply</p>
              </div>
            </div>
          }
          <div>
            <img
              className='edit-comment'
              src="https://www.pngfind.com/pngs/m/70-704184_png-file-svg-pencil-edit-icon-png-transparent.png"
              alt=""
              onClick={() => setIsEditing(!isEditing)}
              />
          </div>
        </div>
      </div>
    </div>
  </div>
)
}