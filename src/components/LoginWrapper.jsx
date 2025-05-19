// src/components/LoginWrapper.jsx
import MobileLogin from "./MobileLogin.jsx";
import DesktopLogin from "./Login.jsx";

export default function LoginWrapper() {
  return (
    <>
      {/* MOBILE ONLY: show on <768px */}
      <div className="block md:hidden">
        <MobileLogin />
      </div>

      {/* DESKTOP ONLY: show on ≥768px */}
      <div className="hidden md:flex items-center justify-center min-h-screen bg-gray-100">
        <DesktopLogin />
      </div>
    </>
  );
}
