import React, { useState } from 'react';
import Comment from './Comment';
import NewComment from './NewComment';

export default function CommentBox({ 
    comment,
    action,
    display,
    handleUpVotes,
    handleReplyUpVotes,
    id,
    setComments,
    deleteComment,
    deleteReply,
    updateCommentContent,
    updateReplyContent
  }) {
  const [showReplies, setShowReplies] = useState(false);
  return(
    action === 'create' ? (
      <NewComment
        display={display}
        setComments={setComments}
      ></NewComment>
    ) : (
      <>
      <Comment
        type='comment'
        comment={comment}
        id={id}
        handleUpVotes={handleUpVotes}
        handleReplyUpVotes={handleReplyUpVotes}
        showReplies={showReplies}
        setShowReplies={setShowReplies}
        deleteComment={deleteComment}
        deleteReply={deleteReply}
        updateCommentContent={updateCommentContent}
        updateReplyContent={updateReplyContent}
      />
            
      {showReplies && (
        ( <>
          <div className='new-comment-container'>
            <NewComment
              display={display}
              setComments={setComments}
              parentId={id}
            />
            </div>
             <div className='all-replies-container'>
            {(comment.replies).map(reply => {
              return(
                <Comment
                  key={reply.id}
                  type='reply'
                  comment={reply}
                  id={reply.id}
                  parentId={comment.id}
                  showReplies={false}
                  handleUpVotes={handleUpVotes}
                  handleReplyUpVotes={handleReplyUpVotes}
                  deleteComment={deleteComment}
                  deleteReply={deleteReply}
                  updateCommentContent={updateCommentContent}
                  updateReplyContent={updateReplyContent}
                />
              )
            })}
          </div>
          </>
        )
      )}
      <div>
      </div>
      </>
    )
   
  )
}
