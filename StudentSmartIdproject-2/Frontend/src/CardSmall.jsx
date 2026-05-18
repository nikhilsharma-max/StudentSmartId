
import './CardSmall.css'
import { Ellipsis } from 'lucide-react';

export function CardSmall({heading,data,detail}) {
  return (
    <div className='main-div-card'>
      <div className='card-header-dashboard'>
        <p>{heading}</p>
        <Ellipsis className='ellipsis-icon' />
      </div>
      <div className='data'>
        {data}
      </div>
      <div className='bottom-detail'>
        {detail}
      </div>
    </div>
  )
}
