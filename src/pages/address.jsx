import { useState, useRef } from "react";
import Modal from 'react-modal';


import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

// data
import regions from "../utility/regions";


export default function Adress() {

    const [modalIsOpen, setIsOpen] = useState(false);

    // modal
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const RegionSelect = (element) => {
        const select = document.getElementById('selected');
        
        
        regions.forEach(item => {

            if(element == item.name) {
                select.innerHTML = null;

                item.district.forEach(i => {
                    const option = document.createElement('option');
                    option.innerHTML = i.name
                    select.appendChild(option);
                })

            } 
        })
        
    }

    return(
        <>
            <Header/>
            <section className="mt-20 mb-20">
                <div className="container">
                    <div className="adres flex justify-between">
                        <div className="left">
                            <h1 className="text-[25px] font-bold w-96">Buyurtma yetkaziladigan manzil </h1>
                            <p>(Iltimos manzilni batafsil va to'g'ri kiriting)</p>
                        </div>
                        <div className="select mt-10 mr-40 ">
                            <select onChange={(e) => RegionSelect(e.target.value)} className="border-2 border-solid p-2 rounded-lg block w-72" name="" >
                                <option selected>Yaxshash maznilingizni kiriting</option>
                                <option value="Andijon">Andijon viloyati</option>
                                <option value="Buxoro">Buroxo viloyati</option>
                                <option value="Fargona">Farg'ona viloyati</option>
                                <option value="Jizzax">Jizzax viloyati</option>
                                <option value="Xorazim">Xorazim  viloyati</option>
                                <option value="Namangan">Namangan viloyati</option>
                                <option value="Samarqand">Samarqand viloyati</option>
                                <option value="Navoiy">Navoiy viloyati</option>
                                <option value="Qashqadaryo">Qashqadaryo viloyati</option>
                                <option value="Surxondaryo">Surxondaryo viloyati</option>
                                <option value="Sirdaryo">Sirdaryo viloyati</option>
                                <option value="Toshkent viloyati">Toshkent viloyati</option>
                                <option value="Toshkent shaxar">Toshkent shaxar</option>
                            </select>

                            <select id="selected" className="select border-2 border-solid p-2 rounded-lg mt-10 w-72" name="" >
                                <option value="" selected>Tuman kiriting</option>
                            </select>

                            <div className="mt-10">
                                <input className="w-72 border-2 border-solid border-black p-2 rounded-lg" type="text" placeholder="uy manzilingizni kiriting" />
                            </div>

                            <button onClick={openModal} className="mt-10 border-2 w-72 p-2 bg-slate-700 text-white font-bold rounded-lg">Shartnoma olish</button>
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
            </section>
            <Footer/>
        </>
    )
}