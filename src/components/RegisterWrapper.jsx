// src/components/RegisterWrapper.jsx
import MobileRegister from "./MobileRegister";
import DesktopRegister from "./Register";

export default function RegisterWrapper() {
  return (
    <>
      <div className="block md:hidden">
        <MobileRegister />
      </div>
      <div className="hidden md:flex items-center justify-center min-h-screen bg-gray-100 ">
        <DesktopRegister />
      </div>
    </>
  );
}
