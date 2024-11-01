import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { FaBars } from "react-icons/fa";
import SideMenu from "../comp/SideMenu";
import { statisticsdata, User } from "../Interface/MainInterface";
import { formatNumber } from "../Services/Utility";
import { Product } from "../Services/interface";
import { Link } from "react-router-dom";
import { BiLogOut, BiSearch } from "react-icons/bi";
import { getAuth, signOut } from "firebase/auth";
import { getuser } from "../Services/GetUser.service";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase";
import { Chart, ArcElement, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<User>();
  const [statistics, setStatistics] = useState<statisticsdata>();
  const [product, setProduct] = useState<Product[]>();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
 
Chart.register(ArcElement, ChartDataLabels, Tooltip);

  useEffect(() => {
    getuser("", (res: User[]) => {
      const data = res[0];
      setUser(data);
    });
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    const querySnapshot = await getDocs(collection(database, "company"));
    const categoriesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setStatistics(categoriesData[0] as statisticsdata);
  };

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(database, "products"));
    const categoriesData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    setProduct(categoriesData as Product[]);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const pieChartData = {
    labels: ["Total Products", "Total Sales", "Income", "Items Sold"],
    datasets: [
      {
        data: [
          product ? product.length : 0,
          statistics ? statistics.totalSale : 0,
          statistics ? statistics.income : 0,
          statistics ? statistics.totalItemsSold : 0,
        ],
        backgroundColor: ["#007bff", "#28a745", "#dc3545", "#ffc107"],
        hoverBackgroundColor: ["#0056b3", "#218838", "#c82333", "#e0a800"],
      },
    ],
  };

  const pieChartOptions = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const, // Explicitly specify font weight type
          size: 11,
        },
        formatter: (value: number, context: any) => {
          return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const dataLabel = tooltipItem.label || "";
            const value = tooltipItem.raw;
            return `${dataLabel}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="h-screen flex">
      {isMenuOpen && (
        <SideMenu user={user as User} toggleMenu={toggleMenu} isMobile={isMobile} />
      )}

      <div className={`flex-1 ${isMenuOpen && !isMobile ? "lg:ml-64" : "ml-0"} transition-all duration-300`}>
        <nav className="flex justify-between items-center h-14 px-4 py-8">
          <div className="flex items-center">
            {!isMenuOpen && <FaBars className="text-lg cursor-pointer mr-4" onClick={toggleMenu} />}
          </div>
          <div className="flex items-center space-x-2 border-b border-gray-400 py-2">
            <BiSearch className="text-gray-500" />
            <input type="text" placeholder="Search Something" className="outline-none text-gray-500 w-full placeholder-gray-500" />
          </div>
          <div className="flex items-center text-[1rem] space-x-4">
            <p>View Store</p>
            <BiLogOut className="text-lg cursor-pointer text-[2rem] text-black" onClick={handleLogout} />
          </div>
        </nav>

        <div className="p-4 h-[85vh] overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            {/* Dashboard boxes */}
            <div className="bg-blue-900 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Total Product</p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">{product ? formatNumber(product.length) : 0}</h1>
              <Link to="/auth/product/dashboard">
                <button className="bg-white text-black p-2 rounded-md">View</button>
              </Link>
            </div>
            <div className="bg-blue-800 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Total Sale</p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">&#8358; {statistics ? formatNumber(statistics.totalSale) : 0}</h1>
            </div>
            <div className="bg-blue-800 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Income</p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">&#8358; {statistics ? formatNumber(statistics.income) : 0}</h1>
            </div>
            <div className="bg-blue-800 w-full p-6 text-center rounded-lg">
              <p className="font-semibold text-white mb-3">Items Sold</p>
              <h1 className="font-extrabold text-white text-[1.4rem] mb-3">{statistics ? formatNumber(statistics.totalItemsSold) : 0}</h1>
            </div>
          </div>

          {/* Pie chart */}
          <div className="mt-8 h-[40vh] md:h-[50] flex justify-center items-center">
            <Pie data={pieChartData} options={pieChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
