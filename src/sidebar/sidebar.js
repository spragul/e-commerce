import {
    FaUserSecret,
    FaRegEdit,
    FaBookReader,
    FaRegFileAlt,
    FaVolleyballBall,
    FaShoppingCart,
    FaLuggageCart

} from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function Sidebar({ children }) {
    const Name = sessionStorage.getItem('myName');
    const MyRole = sessionStorage.getItem('myRole')
        const menuItem = [
            {
                path: "/",
                name: "Dashboard",
                icon: <FaBookReader />
            },
            {
                path: "/addproduct",
                name: "Add Product",
                icon: <FaRegEdit />
            },
            {
                path: "/admin",
                name: "Admin",
                icon: <FaUserSecret />
            },
            {
                path:'/myorders',
                name:"Orders",
                icon:<FaLuggageCart/>
            },
            {
                path:'/favorite/products',
                name:"FavoriteProducts",
                icon:<FaRegFileAlt/>
            }

        ]
        const menuItem1 = [
            {
                path: "/",
                name: "Dashboard",
                icon: <FaBookReader />
            },
            {
                ppath:'/myorders',
                name:"Orders",
                icon:<FaLuggageCart/>
            },         
            {
                path:'/favorite/products',
                name:"FavoriteProducts",
                icon:<FaRegFileAlt/>
            }
        ]

    return (
        <div className="sid-container">

            <div className="sidebar">
                <div className="top_section">
                    <div className="icon"><FaVolleyballBall /></div>
                    <div className="link d-none d-sm-inline">Rental App </div>
                </div>
                {MyRole==="admin" ?
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link text-deactron" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="ms-3 d-none d-sm-inline">{item.name}</div>
                        </NavLink>
                    )) :    menuItem1.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link text-deactron" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div className="ms-3 d-none d-sm-inline">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>

            <main>
                <NavScrollExample
                    title={Name}
                />
                {children}
                <Footer />
            </main>

        </div>
    );
};

export default Sidebar;

export function NavScrollExample({ title }) {
    const MyRole = sessionStorage.getItem('myRole')
    function filtered() {
        console.log("clicked");

    }
    function logout() {
        sessionStorage.clear();
        navigate("/login")
    }
    function adminlogin(){
        if(MyRole==="admin"){
            alert("You are Admin")
        }else{
            sessionStorage.clear();
            navigate("/login")
        }
    }
    const navigate = useNavigate()
    return (
        <div>
            <Navbar className="nav-clr" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#" style={{ color: "gold", fontSize: "30px" }} className="title">{title}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <button class="btn btn-outline-warning me-2" type="button" onClick={() => navigate("/")}>Home</button>
                            {MyRole ==="user" ?
                            <button class="btn btn-outline-warning me-2" type="button" onClick={() => navigate("/myorders")}> <div className="icon"></div><FaShoppingCart />Order</button>: ""
                            }
                        </Nav>
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"

                            />
                            <Button class="btn btn-outline-warning me-2" onClick={() => filtered()}>Search</Button>
                        </Form>
                        <button class="btn btn-outline-warning me-2" type="button" onClick={()=>logout()}>Logout</button>
                        <button class="btn btn-outline-warning me-2" type="button" onClick={()=>adminlogin()} >Adminlogin</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}

export function Footer() {
    return (
        <div>
            <footer>
                contact us
                <div>email : Ecommerce23@gmail.com</div>
                <div>phone : 9788652355</div>
            </footer>
        </div>
    )
}