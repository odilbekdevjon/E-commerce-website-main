import "./address.scss";
import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
// data
import regions from "../../utility/regions";


export default function Adress() {
    const [order] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

    const [ regionSelect, setRegionSelect ] = useState("");
    const [ distirictSelect, setDistirictSelect ] = useState("");
    const [ addressSelect, setAddressSelect ] = useState("");
    const [ selectRegion, setSelectRegion ] = useState("");
    const [ phone , setPhone ] = useState("");

    const RegionSelect = (element) => {
        const findRegion = regions.find((item) => item.name === element)
        setSelectRegion(findRegion)
    }

    

    const sendAdres = () => {
        const address = `${regionSelect} ${distirictSelect} ${addressSelect}`
        console.log(address);
        console.log(phone);
        
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
                        <div className="select mt-10 mr-40 ">
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
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}