import React, { useEffect, useState } from 'react';
import { Card, Carousel, Col, Row } from 'react-bootstrap';
import { getAllTypeOfHotel } from '../../utils/APIFunctions';
import { useNavigate } from 'react-router-dom';

const ChoiceTypeVacation = () => {
  const [type, setType] = useState([]);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await getAllTypeOfHotel();
        setType(res);
      } catch (err) {
        console.error('Error fetching data:', err.message);
      }
    };
    getAll();
  }, []);

  const selectedDate = new Date();
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  const selectedNextDate = nextDay;

  const guest = 2;
  const navigate = useNavigate();
  const loca = "";

  const handleSearch = (e, type) => {
    e.preventDefault();
    navigate(`/Hotel-Search?location=&guest=${guest}&selectedDate=${selectedDate}&selectedNextDate=${selectedNextDate}&type=${type}`, {
      state: { location: loca, guest, selectedDate, selectedNextDate, type }
    });
    window.location.reload();
  };

  return (
    <div className="mb-5">
      <h3 className='mt-5'>Tìm cho mình nơi lưu trú yêu thích tiếp theo</h3>
      <div className='mt-5' >
        <Carousel indicators={false}>
          {[...Array(Math.ceil(type.length / 4))].map((_, index) => {
            const start = index * 4;
            const end = start + 4;
            const items = type.slice(start, end);

            return (
              <Carousel.Item key={index}>
                <div className="d-flex flex-wrap">
                  {items.map((image, imgIndex) => (
                    <Col key={imgIndex} xs={12} sm={6} md={3} className="p-2">
                      <Card className="p-0 border-0 rounded-3">
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${image.image}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px", objectFit: 'cover', cursor: 'pointer' }}
                          onClick={(e) => handleSearch(e, image.typeName)}
                        />
                        <Card.Text className="text-white position-absolute bottom-0 start-0 p-2" style={{ fontSize: "20px" }}>
                          {image.typeName}
                        </Card.Text>
                      </Card>
                    </Col>
                  ))}
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
};

export default ChoiceTypeVacation;
