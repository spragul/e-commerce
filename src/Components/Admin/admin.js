import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../provider/provider';
import Sidebar from '../../sidebar/sidebar';
import { UserList } from './userlist';
import { URL } from '../../backend link';

function DarkExample() {
  return (
    <Sidebar>
      <ListTable
        heading="List Of Product"
        sty="bg-info text-white"
      />
      <UserList/>
    </Sidebar>
  );
}

export default DarkExample;

function ListTable({ heading, sty }) {
  const { productData, setProductData } = AppState();
  console.log(productData);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  //delete product
  const productDelete = async (idx) => {
    try {
      const response = await fetch(`${URL}/product/delete/${idx}`, {
        method: "Delete",
        headers: { "Authorization": `Bearer ${token}` }
      })
      const data = await response.json();
      // console.log(data);
      const productAlterList = productData.filter((bk) => bk._id !== idx);
      setProductData(productAlterList)

    } catch (error) {
      console.log(error);
      alert(error)
    }

  }

  return (
    <div>
      <h1 className={sty}>{heading}</h1>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>product ID</th>
            <th>product NAME</th>
            <th>Categories</th>
            <th>Image</th>
            <th>Price</th>
            <th>Product status</th>
            <th>BUTTON</th>
          </tr>
        </thead>
        {productData.map((prod, index) => (
          <tbody>
            <tr key={index}>
              <td>{prod._id}</td>
              <td>{prod.productName}</td>
              <td>{prod.categories}</td>
              {/* <td>{prod.description}</td>
              <td>{prod.specifications}</td> */}
              <td><img style={{width:"50px",height:"50px"}} src={prod.image} title={prod.productName} alt={prod.productName}></img></td>
              <td>{prod.price}</td>
              {/* <td>{prod.releaseDate}</td> */}
              {prod.status===true ?<td>true</td>:<td>false</td> }
              <td><div className='btn-group'>
                <button
                  className='button button-edit'
                  onClick={() => navigate(`/edit/product/${prod._id}`)}
                >Edit
                </button>
                <button
                  className='button button-delete'
                  onClick={() => productDelete(prod._id)}
                >Delete
                </button>
              </div></td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  )
}
