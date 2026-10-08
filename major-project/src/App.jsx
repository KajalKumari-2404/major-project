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

import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./store/AuthContext";
import useUIStore from "./store/uiStore";

function App() {
  const { isDarkMode } = useUIStore();

  return (
    <div className={isDarkMode ? "dark-theme" : "light-theme"}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </div>
  );
}

export default App;