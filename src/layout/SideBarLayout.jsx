// src/components/Layout/SideBarLayout.jsx
import SideBar from "../components/SideBar";

const SideBarLayout = ({ insideComponent, nav, label }) => {
  return (
    <div className="flex min-h-screen">
      <SideBar navigate={nav} />
      <main className="flex-1 p-4 bg-gray-50 overflow-y-auto font-bold">
        {label && <h1 className="w-full text-3xl text-left">{label}</h1>}
        {insideComponent}  
      </main>
    </div>
  );
};

export default SideBarLayout;
