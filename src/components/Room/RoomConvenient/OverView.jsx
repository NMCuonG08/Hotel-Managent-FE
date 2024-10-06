import React, { useState, useEffect } from 'react';

const OverView = ({ comments }) => {
    const [averageScores, setAverageScores] = useState({
        clean: 0,
        service: 0,
        convenient: 0,
        condition: 0,
        friendly: 0
    });

    useEffect(() => {
        if (comments.length > 0) {
            const totalScores = comments.reduce((acc, comment) => {
                return {
                    clean: acc.clean + comment.clean,
                    service: acc.service + comment.service,
                    convenient: acc.convenient + comment.convenient,
                    condition: acc.condition + comment.condition,
                    friendly: acc.friendly + comment.friendly
                };
            }, { clean: 0, service: 0, convenient: 0, condition: 0, friendly: 0 });

            const numberOfComments = comments.length;
            setAverageScores({
                clean: totalScores.clean / numberOfComments,
                service: totalScores.service / numberOfComments,
                convenient: totalScores.convenient / numberOfComments,
                condition: totalScores.condition / numberOfComments,
                friendly: totalScores.friendly / numberOfComments
            });
        }
    }, [comments]);

    const numberOfComments = comments.length > 0 ? comments.length : 0


    const averageTotalScore = (
        (averageScores.clean +
        averageScores.service +
        averageScores.convenient +
        averageScores.condition +
        averageScores.friendly) / 5
    ).toFixed(1);

    return (
        <div className="container">
            <div className='overview-container ms-5 me-5 '>
            <div className='pane ms-5'  >
                <p>Overall Rating & Reviews</p>
                <p>From {numberOfComments} verified guests reviews</p>
               <div className='custom-cricle '>
                    <p>{averageTotalScore}</p>
               </div>
            </div>
            <div className='pane left-pane me-5'>
                <div className="data-box">
                    <span className="title">Sạch sẽ: </span>
                    <div className="data-bar">
                        <div className="data-per" style={{ width: `${averageScores.clean * 10}%` }}>
                            <span className="tooltip">{averageScores.clean.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                <div className="data-box">
                    <span className="title">Nhân viên & dịch vụ: </span>
                    <div className="data-bar">
                        <div className="data-per" style={{ width: `${averageScores.service * 10}%` }}>
                            <span className="tooltip">{averageScores.service.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                <div className="data-box">
                    <span className="title">Tiện nghi, dịch vụ: </span>
                    <div className="data-bar">
                        <div className="data-per" style={{ width: `${averageScores.convenient * 10}%` }}>
                            <span className="tooltip">{averageScores.convenient.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                <div className="data-box">
                    <span className="title">Điều kiện & cơ sở vật chất nơi lưu trú: </span>
                    <div className="data-bar">
                        <div className="data-per" style={{ width: `${averageScores.condition * 10}%` }}>
                            <span className="tooltip">{averageScores.condition.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
                <div className="data-box">
                    <span className="title">Thân thiện với môi trường: </span>
                    <div className="data-bar">
                        <div className="data-per" style={{ width: `${averageScores.friendly * 10}%` }}>
                            <span className="tooltip">{averageScores.friendly.toFixed(1)}%</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        </div>
    );
};

export default OverView;
