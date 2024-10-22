import "./address.scss";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
// data
import regions from "../../utility/regions";
// import { Route, useNavigation } from "react-router-dom";

export default function Adress() {
    const [ user ]  = useAuth()    
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])
    // const navigate = useNavigation();
    // input data
    const [ regionSelect, setRegionSelect ] = useState("");
    const [ distirictSelect, setDistirictSelect ] = useState("");
    const [ addressSelect, setAddressSelect ] = useState("");
    const [ phone , setPhone ] = useState("");
    const [ oked , setOked ] = useState("");
    const [ xr , setXr ] = useState("");
    const [ bank , setBank ] = useState("");
    const [ mfo , setMfo ] = useState("");
    // select
    const [ selectRegion, setSelectRegion ] = useState("");
    const RegionSelect = (element) => {
        const findRegion = regions.find((item) => item.name === element)
        setSelectRegion(findRegion)
    }

    // send conract
    const sendContract = async () => {
        const data = JSON.parse(localStorage.getItem('data'));
        try {
            const response = await axios.post(`https://5jiek.uz/api/v1/contract/create-contract-by-user`, data, {
                withCredentials:true
            })
            console.log(response.data);
            localStorage.removeItem("cart");
            localStorage.removeItem("data");
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const sendAdres = async () => {
        const address = `${regionSelect} ${distirictSelect} ${addressSelect}`;

        const data = new FormData();
        data.append('address', address );
        data.append('phone_number', phone );
        data.append('oked', oked );
        data.append('x_r', xr );
        data.append('bank', bank);
        data.append('mfo', mfo);

        try {
            await axios.patch(`https://5jiek.uz/api/v1/user/update-user-data`, data, {
                headers : {
                    "Content-Type": "application/json",
                },
                withCredentials:true,
            })
            .then(response => {
                console.log('Data updated successfully', response.data);
                // sendContract();
                localStorage.removeItem("cart");
                localStorage.removeItem("data");
                window.location.reload();
            })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <Header order={order}/>
            <section className="mt-28 mb-20">
                <div className="container">
                    <div className="address flex justify-between">
                        <div className="left">
                            <h1 className="address__title text-[25px] font-bold w-96">Buyurtma yetkaziladigan manzil </h1>
                            <p>(Iltimos manzilni batafsil va to'g'ri kiriting)</p>
                        </div>
                        <div className="">

                        {
                                user.is_LLC === false ? (
                                    <div className="select mt-10">
                                    <select onChange={(e) => {
                                            RegionSelect(e.target.value);
                                            setRegionSelect(e.target.value);
                                        }} className="border-2 border-solid p-2 rounded-lg block w-72" name="" >
                                            <option defaultChecked>Select</option>
                                        { regions.map((item, i) => (
                                            <option key={i} value={`${item.name}`}>{item.name}</option>
                                        )) }
                                    </select>
    
                                        <select onChange={(e) => setDistirictSelect(e.target.value)}  id="selected" className="select border-2 border-solid p-2 rounded-lg mt-10 w-72" name="" >
                                            <option defaultChecked>Select</option>
                                            {
                                                selectRegion?.district?.map((item,i) => (
                                                    <option key={i} value={`${item.name} shaxar`}>{item.name}</option>
                                                ))
                                            }
                                        </select>
    
                                        <div className="mt-10">
                                            <input onChange={(e) => setAddressSelect(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="text" placeholder="uy manzilingizni kiriting" />
                                        </div>
    
                                        <div className="mt-10">
                                            <input onChange={(e) => setPhone(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="tel" placeholder="Telfon raqaminingzni kriting" />
                                        </div>
                                    <button onClick={sendAdres} className="mt-10 border-2 w-72 p-2 bg-slate-700 text-white font-bold rounded-lg">Shartnoma olish</button>
                               </div>
                                    
                                ) : (
                                <div className="select flex mt-10 ">
                                    <div className="mr-40">
                                        <select onChange={(e) => {
                                                RegionSelect(e.target.value);
                                                setRegionSelect(e.target.value);
                                            }} className="border-2 border-solid p-2 rounded-lg block w-72" name="" >
                                                <option defaultChecked>Select</option>
                                            { regions.map((item, i) => (
                                                <option key={i} value={`${item.name}`}>{item.name}</option>
                                            )) }
                                        </select>
    
                                        <select onChange={(e) => setDistirictSelect(e.target.value)}  id="selected" className="select border-2 border-solid p-2 rounded-lg mt-10 w-72" name="" >
                                            <option defaultChecked>Select</option>
                                            {
                                                selectRegion?.district?.map((item,i) => (
                                                    <option key={i} value={`${item.name} shaxar`}>{item.name}</option>
                                                ))
                                            }
                                        </select>
    
                                        <div className="mt-10">
                                            <input onChange={(e) => setAddressSelect(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="text" placeholder="uy manzilingizni kiriting" />
                                        </div>
    
                                        <div className="mt-10">
                                            <input onChange={(e) => setPhone(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="tel" placeholder="Telfon raqaminingzni kriting" />
                                        </div>
                                    </div>

                                        <div className="is__LLC relative bottom-10 z-[-10] ">
                                            <div className="mt-10">
                                                <input onChange={(e) => setOked(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="text" placeholder="oked" />
                                            </div>
                                            <div className="mt-10">
                                                <input onChange={(e) => setXr(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="tel" placeholder="x_r" />
                                            </div>
                                            <div className="mt-10">
                                                <input onChange={(e) => setBank(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="tel" placeholder="bank" />
                                            </div>
                                            <div className="mt-10">
                                                <input onChange={(e) => setMfo(e.target.value)} className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="tel" placeholder="mfo" />
                                        </div>
                                        <button onClick={sendAdres} className="mt-10 border-2 w-72 p-2 bg-slate-700 text-white font-bold rounded-lg">Shartnoma olish</button>
                                    </div>
                               </div>
                               
                            )
                        }
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}