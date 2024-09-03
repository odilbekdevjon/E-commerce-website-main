import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import Modal from 'react-modal';


// components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import ConstructionProducts from "../database/data";

export default function Orders() {

    const { id } = useParams()


    // hook
    const [modalIsOpen, setIsOpen] = useState(false);
    const [count , setCount ] = useState(0)


    // modal
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    
    return(
        <>
        <Header/>
        <div className="container">
            <ul className="mt-24 mb-10">
                {
                    (ConstructionProducts ? ConstructionProducts.filter(i => i.id === Number(id)): ConstructionProducts).map(item => {
                        return(
                            <li id="cars" key={item.id} className="item flex p-2 border-solid border-2 rounded mt-5 hover:shadow-lg w-[800px] h-[400px]">
                                <img className="mb-4 rounded-lg" src={item.image} width={350} height={300} alt="image"/>
                                <div className="ml-5">
                                    <h2 className="mb-2 font-bold text-[30px]">{item.name}</h2>
                                    <p className="w-72">{item.description}</p>
                                    <div className="my-2"><b>{item.massa} </b> (qoldiq: {item.balance}) </div>
                                   <div className="flex">
                                    <div className="">
                                           <div className=""> 
                                                <span className="text-blue-600  text-[25px]">{item.discount}</span> 
                                                <span className=" bg-cyan-700 text-white px-2 rounded-lg ml-4">{item.percent}</span>
                                            </div>
                                            <span className="opacity-[0.5] text-[15px] block mb-1 line-through">{item.price}</span>
                                            <input className="w-28 border-2 border-solid p-1" placeholder="son kiriting"  type="number" />
                                            <div className="p-4 bg-slate-200 rounded-lg mt-5 mr- flex justify-between items-center w-32">
                                                <button onClick={() => setCount(count - 1)} className="text-[20px] text-orange-500 font-bold">-</button><b>{count}</b> <button onClick={() => setCount(count + 1)} className="text-[20px] text-orange-500 font-bold">+</button>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <Link to={`/order/${item.id}/adress`}><button className="w-40 p-2 rounded-lg block mt-14 bg-cyan-700 text-white font-bold">Sotib olish</button> </Link>
                                            <div className="mt-4"><input type="checkbox" /> Yetkazib berish xizmati bilan</div> 
                                        </div>                         
                                   </div>
                            <Modal
                                isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Example Modal"
                                style={{
                                    content: { top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%', transform: 'translate(-50%, -50%)', },
                                }}>
                                <div className="w-64">
                                    <div className="flex">
                                    <h1 className="font-bold text-center mb-2 text-lg">Tasdiqlash codini kiriting</h1> 
                                    <button className="border-solid border-black border-2 px-1 rounded-lg ml-6 mb-4 " onClick={() => closeModal()} >X</button>
                                    </div>
                                    <hr />
                                    <label className="text-black line-through" htmlFor="">{"IHHN5456WSDW"}</label>
                                    <input className="w-64 text-black bg-white p-2 border-solid border-2 border-slate-900" type="text" />
                                    <a className="text-blue-400 underline mt-3 mb-3 block" href=""><input className="mr-2" type="checkbox" />Men shaxsiy ma'lumotlarimni uzatishga roziman</a>
                                    <hr />
                                    <button className="mt-5 ml-12 p-2 bg-blue-400 text-white">Tasdiqlash codini yuboring</button>
                                    <button className="text-black mt-4 ml-32 border-solid border-2 border-gray-500 p-1">Kodni yangilash</button>
                                </div>
                            </Modal>
                                </div>
                            </li>
                                )
                            })
                }
            </ul>
        </div>
            <Footer />
        </>
    )
}