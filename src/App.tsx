import React from "react";
import AxiosInterceptor from "./shared/AxiosInterceptor";
import AuthProvider from "./shared/AuthProvider";
import PrefetchProvider from "./shared/PrefetchProvider";
import {useRoutes} from "react-router-dom";
import routes from "./routes";

function App() {
   const content = useRoutes(routes);

   return (
     <AxiosInterceptor>
        <AuthProvider>
           <PrefetchProvider>{content}</PrefetchProvider>
        </AuthProvider>
     </AxiosInterceptor>
   );
}

export default App;
