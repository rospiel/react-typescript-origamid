import DateInput from '../dateInput/DateInput'
import { useMainContext } from '../../contexts/MainContext';

export default function DateRange() {
  const { start, setStart, end, setEnd } = useMainContext();
  
  return (
    <form className="box flex" onSubmit={(event) => event.preventDefault()}>
      <DateInput
        label="Start"
        value={start}
        onChange={({ target }) => setStart(target.value)}
      />
      <DateInput
        label="End"
        value={end}
        onChange={({ target }) => setEnd(target.value)}
      />
    </form>
  )
}