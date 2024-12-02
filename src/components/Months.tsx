import ButtonMonth from './buttonMonth/ButtonMonth'

export default function Months() {
  return (
    <div className='flex'>
      <ButtonMonth numberMonth={9}/>
      <ButtonMonth numberMonth={10}/>
      <ButtonMonth numberMonth={11}/>
      <ButtonMonth numberMonth={12}/>
    </div>
  )
}