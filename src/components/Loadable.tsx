import React, {Suspense} from "react";
import Loader from "./Loader";

const Loadable =
  <P extends object>(Component: React.ComponentType<P>) =>
    (props: P) => {
       return (
         <Suspense fallback={<Loader/>}>
            <Component {...props} />
         </Suspense>
       );
    };

export default Loadable;
