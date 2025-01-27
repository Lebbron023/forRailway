import qwe from '../assets/react.svg'

function Navbar() {
    return (
        <>
            <nav className="bg-green-800 px-2 py-2">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={qwe} alt="Logo" className="h-8 w-auto m-2" />
                        <div className="text-white text-xl">Monvirey Poultry Farm</div>
                    </div>
                    <div className="flex space-x-4 items-center">
                        <div
                            className={`nav-item cursor-pointer text-white hover:text-gray-300 'border-b-2 border-white pb-2' : ''}`}
                        >
                            Home
                        </div>
                        <div
                            className={`nav-item cursor-pointer text-white hover:text-gray-300 'border-b-2 border-white pb-2' : ''}`}
                        >
                            Inventory
                        </div>
                        <div
                            className={`nav-item cursor-pointer text-white hover:text-gray-300 'border-b-2 border-white pb-2' : ''}`}
                        >
                            Transactions
                        </div>
                        <div
                            className={`nav-item cursor-pointer text-white hover:text-gray-300 'border-b-2 border-white pb-2' : ''}`}
                        >
                            Batch History
                        </div>
                        <div
                            className={`nav-item cursor-pointer text-white hover:text-gray-300 'border-b-2 border-white pb-2' : ''}`}
                        >
                            Accounts
                        </div>

                        {/* My Account with Dropdown */}
                        <div
                            className="relative"
                        >
                            <div
                                className={`nav-item cursor-pointer text-white hover:text-gray-300`}
                            >
                                <img src={qwe} alt="My Account" className="h-8 w-10 mb-1" />
                            </div>

                            {/* Dropdown Menu */}

                            <div className="absolute bg-white text-black p-1 shadow-lg rounded mt-2 right-0 w-40 z-50">
                                <ul>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        My Profile
                                    </li>
                                    <li
                                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                    >
                                        Logout
                                    </li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar