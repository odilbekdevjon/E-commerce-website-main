const regions = [
    {
      name: "Andijon",
      district: [
        {
          name: "Oltinko'l tumani",
        },
        {
          name: "Baliqchi tumani",
        },
        {
            name: "Voroshilov tumani",
        },
        {
            name: "Jalaquduq tumani",
        },
        {
            name: "Izboskan tumani",
        },
        {
            name: "Lenin tumani",
        },
        {
            name: "Marhamat tumani",
        },
      ],
    },
    {
      name: "Buxoro",
      district: [
        {
            name:"Vobkent tumani"
        },
        {
            name:"Jondor tumani"
        },
        {
            name:"Kogon tumani"
        },
        {
            name:"Olot tumani"
        },
        {
            name:"Peshkoʻpiri tumani"
        },
        {
            name:"Romitan tumani"
        },
        {
            name:"Shofirkon tumani"
        },
        {
            name:"Qorovulbozor tumani"
        },
        {
            name:"Qorakoʻl tumani"
        },
        {
            name:"G'ijduvon tumani"
        },
      ]
    },
    {
        name:"Fargona",
        district: [
            {
                name:"Oltiariq tumani"
            },
            {
                name:"Bagʻdod tumani"
            },
            {
                name:"Beshariq tumani"
            },
            {
                name:"Buvayda tumani"
            },
            {
                name:"Dangʻara tumani"
            },
            {
                name:"Fargʻona tumani"
            },
            {
                name:"Qoʻshtepa tumani"
            },
            {
                name:"Quva tumani"
            },
            {
                name:"Rishton tumani"
            },
            {
                name:"So'x tumani"
            },
            {
                name:"Toshloq tumani"
            },
            {
                name:"Uchko'pirik tumani"
            },
            {
                name:"Yozyovon tumani"
            },
        ]
    },
    {
        name:"Jizzax",
        district: [
            {
                name:"Arnasoy tumani"
            },
            {
                name:"Bagʻdod tumani"
            },
            {
                name:"Beshariq tumani"
            },
            {
                name:"Buvayda tumani"
            },
            {
                name:"Dangʻara tumani"
            },
            {
                name:"Fargʻona tumani"
            },
            {
                name:"Qoʻshtepa tumani"
            },
            {
                name:"Quva tumani"
            },
            {
                name:"Rishton tumani"
            },
            {
                name:"So'x tumani"
            },
            {
                name:"Toshloq tumani"
            },
            {
                name:"Uchko'pirik tumani"
            },
            {
                name:"Yozyovon tumani"
            },
        ]
    },
    {
        name:"Xorazim",
        district: [
            {
                name:"Bog'ot tumani"
            },
            {
                name:"Gurlan tumani"
            },
            {
                name:"Qo'shko'pir tumani"
            },
            {
                name:"Shovot tumani"
            },
            {
                name:"Urganch tumani"
            },
            {
                name:"Xazorasp tumani"
            },
            {
                name:"Xiva tumani"
            },
            {
                name:"Xonqa tumani"
            },
            {
                name:"Yangiariq tumani"
            },
            {
                name:"Yangibozor tumani"
            },
        ]
    },
    {
        name:"Namangan",
        district: [
            {
                name:"Kosonsoy tumani"
            },
            {
                name:"Mingbuloq tumani"
            },
            {
                name:"Namangan tumani"
            },
            {
                name:"Norin tumani"
            },
            {
                name:"Pop tumani"
            },
            {
                name:"Toʻraqoʻrgʻon tumani"
            },
            {
                name:"Uychi tumani"
            },
            {
                name:"Uchqoʻrgʻon tumani"
            },
            {
                name:"Chortoq tumani"
            },
            {
                name:"Chust tumani"
            },
            {
                name:"Yangiqoʻrgʻon tumani"
            }
        ]
    },
    {
        name:"Samarqand",
        district: [
            {
                name:"Oqdaryo tumani"
            },
            {
                name:"Bulungʻur tumani"
            },
            {
                name:"Gʻallaorol tumani"
            },
            {
                name:"Jomboy tumani"
            },
            {
                name:"Zomin tumani"
            },
            {
                name:"Xatirchi  tumani"
            },
            {
                name:"Kattaqoʻrgʻon tumani"
            },
            {
                name:"Mitan tumani"
            },
            {
                name:"Narpay tumani"
            },
            {
                name:"Nurota tumani"
            },
            {
                name:"Payariq tumani"
            },
            {
                name:"Pastdargʻom tumani"
            },
            {
                name:"Paxtakor tumani"
            },
            {
                name:"Samarqand tumani"
            },
            {
                name:"Urgut  tumani"
            },
        ]
    },
    {
        name:"Navoiy",
        district: [
            {
                name:"Karmana tumani"
            },
            {
                name:"Konimex tumani"
            },
            {
                name:"Navbahor tumani"
            },
            {
                name:"Nurota tumani"
            },
            {
                name:"Qiziltepa tumani"
            },
            {
                name:"Tomdi tumani"
            },
            {
                name:"Uchquduq tumani"
            },
            {
                name:"Xatirchi tumani"
            },
            {
                name:"Zarafshon shahri"
            },
            
        ]
    },
    {
        name:"Qashqadaryo",
        district: [
            {
                name:"Chiroqchi tumani"
            },
            {
                name:"Dehqonobod tumani"
            },
            {
                name:"G'uzor tumani"
            },
            {
                name:"Kasbi tumani"
            },
            {
                name:"Kitob tumani"
            },
            {
                name:"Koson tumani"
            },
            {
                name:"Mirishkor tumani"
            },
            {
                name:"Moborak tumani"
            },
            {
                name:"Nishon tumani"
            },
            {
                name:"Qamashi tumani"
            },
            {
                name:"Qarshi tumani"
            },
            {
                name:"Shahrisabz tumani"
            },
            {
                name:"Yakkabog' tumani"
            },
        ]
    },
    {
        name:"Surxondaryo",
        district: [
            {
                name:"Angor tumani"
            },
            {
                name:"Bandixon tumani"
            },
            {
                name:"Boysun tumani"
            },
            {
                name:"Denov tumani"
            },
            {
                name:"Jarqoʻrgʻon tumani"
            },
            {
                name:"Muzrabot tumani"
            },
            {
                name:"Oltinsoy tumani"
            },
            {
                name:"Sariosiyo tumani"
            },
            {
                name:"Termiz tumani"
            },
            {
                name:"Uzun tumani"
            },
            {
                name:"Sherobod tumani"
            },
            {
                name:"Shoʻrchi tumani"
            },
            {
                name:"Qiziriq tumani"
            },
            {
                name:"Qumqoʻrgʻon tumani"
            },
        ]
    },
    {
        name:"Sirdaryo",
        district: [
            {
                name:"Boyovut tumani"
            },
            {
                name:"Guliston tumani"
            },
            {
                name:"Mirzaobod tumani"
            },
            {
                name:"Oqoltin tumani"
            },
            {
                name:"Sayxunobod tumani"
            },
            {
                name:"Sirdaryo tumani"
            },
            {
                name:"Xovos tumani"
            },
            {
                name:"Sardoba tumani"
            },
        ]
    },
    {
        name:"Toshkent viloyati",
        district: [
            {
                name:"Bekobod tumani"
            },
            {
                name:"Bo'ka tumani"
            },
            {
                name:"Bo'stonliq tumani"
            },
            {
                name:"Chinoz tumani"
            },
            {
                name:"O'rta chirchiq tumani"
            },
            {
                name:"Ohangaron tumani"
            },
            {
                name:"Olmaliq tumani"
            },
            {
                name:"Oqqo'rg'on tumani"
            },
            {
                name:"Parkent  tumani"
            },
            {
                name:"Piskent tumani"
            },
            {
                name:"Qibray  tumani"
            },
            {
                name:"Quyi chirchiq tumani"
            },
            {
                name:"Yangiyo'l  tumani"
            },
            {
                name:"Yuqori chirchiq tumani"
            },
            {
                name:"Zangiota tumani"
            }
        ]
    },
    {
        name:"Toshkent shaxar",
        district: [
            {
                name:"Bektemir tumani"
            },
            {
                name:"Chilonzor tumani"
            },
            {
                name:"Mirobod tumani"
            },
            {
                name:"Mirzo Ulug'bek tumani"
            },
            {
                name:"Olmazor tumani"
            },
            {
                name:"Sergeli tumani"
            },
            {
                name:"Shayhontohur tumani"
            },
            {
                name:"Uchtepa  tumani"
            },
            {
                name:"Yakkasaroy tumani"
            },
            {
                name:"Yashnaobod tumani"
            },
            {
                name:"Yunusobod tumani"
            },
            
        ]
    },
    
];

export default regions;