// import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./store/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <AppRoutes />
//     </AuthProvider>
//   );
// };


// export default App;

// import AppRoutes from "./routes/AppRoutes";
// import { AuthProvider } from "./store/AuthContext";
// import useUIStore from "./store/uiStore";

// function App() {
//   const { isDarkMode } = useUIStore();
//   console.log("Dark mode state:", isDarkMode);

//   return (
//     // <div className={isDarkMode ? "dark-theme" : "light-theme"}>
//     <div
//   className={isDarkMode ? "dark-theme" : "light-theme"}
//   style={{
//     minHeight: "100vh",
//     backgroundColor: isDarkMode ? "#111827" : "#ffffff",
//     color: isDarkMode ? "#ffffff" : "#111827",
//   }}
// >
//       <AuthProvider>
//         <AppRoutes />
//       </AuthProvider>
//     </div>
//   );
// }

// export default App;



import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./store/AuthContext";
import useUIStore from "./store/uiStore";

function App() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);

  useEffect(() => {
    document.documentElement.style.backgroundColor = isDarkMode
      ? "#111827"
      : "#ffffff";

    document.body.style.backgroundColor = isDarkMode
      ? "#111827"
      : "#ffffff";

    document.documentElement.style.colorScheme = isDarkMode
      ? "dark"
      : "light";
  }, [isDarkMode]);

  return (
    <div
      // className={isDarkMode ? "dark-theme" : "light-theme"}
      // style={{
      //   minHeight: "100vh",
      //   backgroundColor: isDarkMode ? "#111827" : "#ffffff",
      //   color: isDarkMode ? "#f9fafb" : "#111827",
      // }}

      style={{
  minHeight: "100vh",
  backgroundColor: isDarkMode ? "red" : "lime",
  color: isDarkMode ? "#ffffff" : "#111827",
}}
    >
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;
