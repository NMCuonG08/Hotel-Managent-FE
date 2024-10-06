import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const CommentCard = ({ comment }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [feedback, setFeedback] = useState('');

  const [showFullFeedback, setShowFullFeedback] = useState('');

  const toggleContent = () => {
    setShowFullContent(!showFullContent);
  };



  const avg = (((comment.clean +
    comment.service +
    comment.convenient +
    comment.condition +
    comment.friendly) / 5)).toFixed(2)


  return (
    <Card style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
      <Card.Body style={{ flex: '1' }}>
        <h3>{avg} / 10</h3> 
        <Card.Text>{comment.user.email}</Card.Text>
      </Card.Body>
      <Card.Body style={{ flex: '2' }}>
        
        <Card.Text style={{color : 'rgb(173, 97, 27)'}} >
          {showFullContent
            ? comment.content
            : comment.content && comment.content.length > 256
            ? `${comment.content.substring(0, 100)}...`
            : comment.content}
          {comment.content && comment.content.length > 256 && (
            <span className="view-more" onClick={toggleContent}>
              {showFullContent ? 'Thu gọn' : 'Xem thêm'}
            </span>
          )}
        </Card.Text>
        <Form.Group controlId="feedbackForm">
  <Form.Label>
    Phản hồi từ <span style={{ color: 'rgb(6, 117, 115)' }}> {comment.hotelInformation.hotelName}</span>
  </Form.Label>
  {comment.feedback && comment.feedback.trim().length > 0 && (
    <Card.Text className='custom-card-text'>
      {showFullContent
        ? comment.feedback
        : comment.feedback.length > 256
        ? `${comment.feedback.substring(0, 100)}...`
        : comment.feedback}
      {comment.feedback.length > 256 && (
        <span className="view-more" onClick={toggleContent}>
          {showFullContent ? 'Thu gọn' : 'Xem thêm'}
        </span>
      )}
    </Card.Text>
  )}
</Form.Group>


         
        

      </Card.Body>
    </Card>
  );
};

export default CommentCard;
