// src/components/Layout/SideBarLayout.jsx
import SideBar from "../components/SideBar";
import GradesLogo from "../assets/roundedheader.svg"

const SideBarLayout = ({ insideComponent, label }) => {
  return (
    <div className="flex min-h-screen">
      <SideBar logo={GradesLogo}/>
      <main className="flex-1 p-4 bg-gray-50 font-bold">
        {label && <h1 className="w-full text-3xl text-left">{label}</h1>}
        {insideComponent}  
      </main>
    </div>
  );
};

export default SideBarLayout;
