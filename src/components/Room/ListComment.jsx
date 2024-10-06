import React, { useState } from 'react';
import CommentCard from './CommentCard';
import HotelPaninator from '../Hotel/HotelPanigater';

const ListComment = ({ comments }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [roomPerPage, setRoomPerPage] = useState(6);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!comments || comments.length === 0) {
    
    return <div>Không có nhận xét nào.</div>;
  }

  const totalPage = Math.ceil(comments.length / roomPerPage);



  const renderComments = () => {
    const startIndex = (currentPage - 1) * roomPerPage;
    const endIndex = startIndex + roomPerPage;
    return comments
      .slice(startIndex, endIndex)
      .map((comment) => (
        <div key={comment.id}>
          <CommentCard comment={comment} />
        </div>
      ))
      

      
  };

  return (
    <div   className="mt-5 container ">
      <div className="mb-5">Đang hiển thị {comments.length} nhận xét thực từ du khách</div>
      {renderComments()}
      <div>
        <HotelPaninator currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default ListComment;
