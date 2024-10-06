import './room.css'

const Status = () => {

    const booking = 1

    const handleOnClickBtn = () => {
        alert('hi')
    }

  return (
    <div className="status d-flex justify-content-between">
        <div className="item" >
            <button onClick={handleOnClickBtn}  style= {{backgroundColor: 'DodgerBlue'}} >{booking}</button>
            Empty
        </div  >
        <div className="item">
            <button  onClick={handleOnClickBtn}  style= {{backgroundColor: 'LimeGreen'}} >{booking}</button>
            Occupied
        </div>
        <div className="item">
            <button  onClick={handleOnClickBtn}  style= {{backgroundColor: 'Purple'}} >{booking}</button>
            Booking
        </div >
        <div className="item">
            <button  onClick={handleOnClickBtn}  style= {{backgroundColor: 'rgb(255, 128, 0)'}} >{booking}</button>
            Check in
        </div>
        <div className="item">
            <button  onClick={handleOnClickBtn}  style= {{backgroundColor: 'Firebrick'}} >{booking}</button>
            Maintance
        </div>


    </div>
  )
}

export default Status