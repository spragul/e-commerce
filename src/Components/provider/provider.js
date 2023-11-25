import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { URL } from "../../backend link";

const AppContext = createContext();
const AppProvider = ({ children }) => {
    const [productData, setProductData] = useState([]);
    // const [issuesdata, setIssueddata] = useState([]);
    
    const token=sessionStorage.getItem('token');
    useEffect(() => {
        const getDetails = async () => {
            try {
                const headers = { 'Authorization': `Bearer ${token}` };
                const response = await fetch(`${URL}/product`,{ headers });
                const data = await response.json();
                const setdata =data.product
                setProductData(setdata)
            } catch (error) {
                console.log(error);
            }
        }
        if(token){
        getDetails();
        }
    }, [])
    // useEffect(() => {
    //     const id=sessionStorage.getItem('myid')
    //     const getDetails = async (id) => {
    //         try {
    //             const headers = { 'Authorization': `Bearer ${token}` };
    //             const response = await fetch(`${mainurl}/cart/${id}`, { headers });
    //             const data = await response.json();
    //             let setdata=data.carts;
    //             setIssueddata(setdata)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     if(token){
    //         getDetails(id);
    //     }
    // }, [])


    return (
        <AppContext.Provider
            value={{
                productData,
                setProductData,
                // issuesdata,
                // setIssueddata
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
export const AppState = () => {
    return useContext(AppContext)
}
export default AppProvider
