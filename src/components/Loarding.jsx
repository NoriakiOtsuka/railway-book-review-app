import ReactLoading from 'react-loading'

import './loading.scss'

export const Loading = (props) => {
  const { type, color } = props

  return (
    <div className="container">
      <ReactLoading type={type} color={color} height={'25%'} width={'25%'} />
    </div>
  )
}
