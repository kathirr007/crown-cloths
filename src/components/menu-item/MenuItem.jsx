import { withRouter } from 'react-router-dom'
import './MenuItem.scss'

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => (
  <div
    className={`menu-item ${size}`}
    onClick={() => history.push(`${match.url}${linkUrl}`)}
    onKeyUp={(e) => e.key === 'Enter' && history.push(`${match.url}${linkUrl}`)}
    role='navigation'
    tabIndex='0'
  >
    <div
      className='background-image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='content'>
      <div className='title'>{title}</div>
      <span className='subtitle'>SHOP NOW</span>
    </div>
  </div>
)

export default withRouter(MenuItem)
