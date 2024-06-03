import Auth from '../components/Auth'
import Quote from '../components/Quote'

function Login() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
    <div>
    <Quote />
    </div>
    <div className="hidden lg:block">
    
      <Auth/>
    </div>
  </div>
  )
}

export default Login