import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Progress, Alert } from 'reactstrap';
import { getSeats, loadSeats, loadSeatsRequest, getRequests } from '../../../redux/seatsRedux';
import io from 'socket.io-client';
import './SeatChooser.scss';

const SeatChooser = ({ chosenDay, chosenSeat, updateSeat }) => {
  const maxSeats = 50;

  const dispatch = useDispatch();
  const seats = useSelector(getSeats);
  const requests = useSelector(getRequests);
  const [socket, setSocket] = useState(null);

  const getSeatTeakenNumber = (seats) => seats.filter(seat => seat.day === chosenDay ? true : false).length;

  useEffect(() => {
    if (socket) {
      socket.on(`seatsUpdated`, (seats) => dispatch(loadSeats(seats)));
    }

    dispatch(loadSeatsRequest());

  }, [dispatch, socket])


  useEffect(() => {
    const socket = io(`localhost:8000`);
    setSocket(socket)
  }, [])

  const isTaken = (seatId) => {
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  const prepareSeat = (seatId) => {
    if (seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if (isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
  }

  return (
    <div>
      <h3>Pick a seat</h3>
      <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
      <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(maxSeats)].map((x, i) => prepareSeat(i + 1))}</div>}
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={ maxSeats} />}
      {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert>}
      <div>Ilosc Miejsc: {getSeatTeakenNumber(seats)} / {maxSeats}</div>
    </div>
  )
}

export default SeatChooser;