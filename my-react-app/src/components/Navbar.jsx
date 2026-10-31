import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import '../styles/navbar.css'
import CartIconWithBadge from './CartIconWithBadge'
import { useCart } from '../context/CartContext'

function Navbar() {
    const { cartCount } = useCart()

    return (
        <div className='navbar'>
            <div className="logo">
                <img src={logo} alt="Brand logo" />
            </div>
            <div className="right">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link className='cart' to="/cart">
                        <span>Cart</span>
                        <CartIconWithBadge itemCount={cartCount} />
                    </Link>
                </nav>
            </div>
        </div>
    )
}

export default Navbar