import React, { useEffect, useState } from 'react';
import { filterHotels } from '../../utils/APIFunctions';
import HotelCard from './HotelCard';
import HotelPanigater from './HotelPanigater';
import { Col, Row } from 'react-bootstrap';
import CreateLoading from '../layout/CreateLoading';
import Finding from '../HomePage/Finding';
import Fitler from './Fitler/Fitler';
import { useLocation, useNavigate } from 'react-router-dom';

const Hotel = () => {
    const [finding, setFinding] = useState({
        location: "location",
        guest: 1,
        selectedDate: new Date(),
        selectedNextDate: new Date(),
        type: ""
    });

    const choicelocation = useLocation();
    const { state } = choicelocation;
    const navigate = useNavigate();

    useEffect(() => {
        if (state) {
            const { location, guest, selectedDate, selectedNextDate, type } = state;

            setFinding({
                location: location ,
                guest: guest,
                selectedDate: selectedDate ,
                selectedNextDate: selectedNextDate,
                type: type 
            });
            
            
        }
        
    }, [state]);
    

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hotelPerPage] = useState(5);
    const [error, setError] = useState("");

    const totalPage = Math.ceil(data.length / hotelPerPage);

    const renderHotels = () => {
        const startIndex = (currentPage - 1) * hotelPerPage;
        const endIndex = startIndex + hotelPerPage;
        return data
            .slice(startIndex, endIndex)
            .map((hotel) => <HotelCard key={hotel.id} hotel={hotel} handleFindRoom={handleFindRoom} />);
    };

    const handleFindRoom = (e, hotelId) => {
        e.preventDefault();
        const { location, selectedDate, selectedNextDate, guest, type } = finding;
        if (location.trim() !== '' && guest != null && selectedDate != null && selectedNextDate != null) {
            const url = `/hotel/${hotelId}/details?location=${encodeURIComponent(location)}&guest=${guest}&selectedDate=${encodeURIComponent(selectedDate.toISOString())}&selectedNextDate=${encodeURIComponent(selectedNextDate.toISOString())}&type=${type}`;
            navigate(url);
        } else {
            alert("Error");
        }
    };

    useEffect(() => {
        const fetchHotels = async () => {
            setIsLoading(true);
            
            if (finding != undefined) {
                try {
                    const data = await filterHotels(finding.location, finding.selectedDate, finding.selectedNextDate, finding.guest, finding.type);
                    setData(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchHotels();
    }, [finding]);

    if (isLoading) {
        return <CreateLoading />;
    }
    if (error) {
        return <div className="text-danger">Error: {error}</div>;
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <div className='container'>
                <br />
                <Finding res={finding} />
                <Row className="mt-5">
                    <Col md={4} className="">
                        <Fitler />
                    </Col>
                    <Col md={8} className="d-flex align-items-center justify-content-center">
                        <Row>{renderHotels()}</Row>
                    </Col>
                    <HotelPanigater currentPage={currentPage} totalPages={totalPage} onPageChange={handlePageChange} />
                </Row>
            </div>
        </>
    );
};

export default Hotel;
