import React, { useEffect, useState } from 'react';
import RoomCard from './RoomCard';
import { getRoomsByHotelID } from '../../../../utils/APIFunctions';
import CreateLoading from '../../../layout/CreateLoading';
import { Col, Container, Row } from 'react-bootstrap';
import HotelPaninator from '../../../Hotel/HotelPanigater';

const ListRoom = ({id}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomPerPage, setRoomPerPage] = useState(9); // Increase the number of rooms per page to accommodate 2 rows
  const [error, setError] = useState('');

  const hotelId = id;

  useEffect(() => {
    setIsLoading(true);
    getRoomsByHotelID(hotelId)
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <CreateLoading />;
  }
  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPage = Math.ceil(data.length / roomPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomPerPage;
    const endIndex = startIndex + roomPerPage;
    const rooms = data.slice(startIndex, endIndex);

    const rows = [];
    for (let i = 0; i < rooms.length; i += 3) {
      const row = rooms.slice(i, i + 3);
      rows.push(
        <Row key={i}>
          {row.map((room) => (
            <Col key={room.id} md={4}>
              <RoomCard room={room} />
            </Col>
          ))}
        </Row>
      );
    }
    return rows;
  };

  return (
    <Container>
      {renderRooms()}
      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <HotelPaninator currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default ListRoom;
